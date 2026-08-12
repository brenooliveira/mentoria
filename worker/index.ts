/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  RESEND_API_KEY?: string;
  RESEND_FROM_EMAIL?: string;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

type ApplicationPayload = {
  name: string;
  email: string;
  whatsapp: string;
  linkedin: string;
  role: string;
  company: string;
  stage: string;
  challenge: string;
  goal90Days: string;
  investmentReadiness: string;
  investmentReadinessLabel: string;
  investmentMode: "after-application" | "initial-price";
  investmentAmountInCents: number | null;
  investmentRangeMinInCents: number | null;
  investmentRangeMaxInCents: number | null;
  source: string;
  consent: boolean;
  website?: string;
  startedAt?: number;
};

const APPLICATION_RECIPIENT = "breno26@gmail.com";
const DEFAULT_RESEND_SENDER = "Candidaturas Coders Zoom <onboarding@resend.dev>";
const MAX_APPLICATION_BYTES = 24_000;

const fieldLabels: Array<[keyof ApplicationPayload, string]> = [
  ["name", "Nome"],
  ["email", "E-mail"],
  ["whatsapp", "WhatsApp"],
  ["linkedin", "LinkedIn"],
  ["role", "Cargo ou ocupação"],
  ["company", "Empresa ou projeto"],
  ["stage", "Estágio do negócio"],
  ["challenge", "Principal desafio atual"],
  ["goal90Days", "Objetivo para os próximos 90 dias"],
  ["investmentReadiness", "Identificador da disponibilidade para investir"],
  ["investmentReadinessLabel", "Disponibilidade para investir"],
  ["investmentMode", "Modo de exibição do preço"],
  ["investmentAmountInCents", "Preço da mentoria"],
  ["investmentRangeMinInCents", "Faixa de investimento — mínimo"],
  ["investmentRangeMaxInCents", "Faixa de investimento — máximo"],
  ["source", "Como conheceu a Coders Zoom"],
];

function jsonResponse(body: object, status = 200) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isValidApplication(value: unknown): value is ApplicationPayload {
  if (!isRecord(value) || value.consent !== true || value.website) return false;

  const requiredFields: Array<keyof ApplicationPayload> = [
    "name",
    "email",
    "whatsapp",
    "role",
    "stage",
    "challenge",
    "goal90Days",
    "investmentReadiness",
    "investmentReadinessLabel",
  ];

  for (const field of requiredFields) {
    const content = value[field];
    if (typeof content !== "string" || content.trim().length === 0 || content.length > 4_000) {
      return false;
    }
  }

  for (const field of ["linkedin", "company", "source"] as const) {
    const content = value[field];
    if (typeof content !== "string" || content.length > 4_000) return false;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email as string)) return false;

  const phoneDigits = (value.whatsapp as string).replace(/\D/g, "");
  if (phoneDigits.length !== 10 && phoneDigits.length !== 11) return false;

  if (value.linkedin) {
    try {
      const linkedIn = new URL(value.linkedin as string);
      if (!/^https?:$/.test(linkedIn.protocol)) return false;
    } catch {
      return false;
    }
  }

  if (!/^[a-z0-9_]+$/.test(value.investmentReadiness as string)) return false;
  if (value.investmentMode !== "after-application" && value.investmentMode !== "initial-price") return false;

  for (const field of ["investmentAmountInCents", "investmentRangeMinInCents", "investmentRangeMaxInCents"] as const) {
    const amount = value[field];
    if (amount !== null && (typeof amount !== "number" || !Number.isInteger(amount) || amount < 0)) return false;
  }

  if (value.investmentMode === "initial-price" && value.investmentAmountInCents === null) return false;

  return typeof value.startedAt === "number" && Date.now() - value.startedAt >= 1_500;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] ?? character);
}

function formatApplicationField(field: keyof ApplicationPayload, value: ApplicationPayload[keyof ApplicationPayload]) {
  if (value === null || value === "") return "Não informado";

  if (["investmentAmountInCents", "investmentRangeMinInCents", "investmentRangeMaxInCents"].includes(field)) {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(value) / 100);
  }

  if (field === "investmentMode") {
    return value === "initial-price" ? "Preço público" : "Preço não publicado";
  }

  return String(value);
}

async function handleApplication(request: Request, env: Env): Promise<Response> {
  if (request.method !== "POST") {
    return jsonResponse({ error: "Método não permitido." }, 405);
  }

  const requestUrl = new URL(request.url);
  const origin = request.headers.get("Origin");
  if (origin && origin !== requestUrl.origin) {
    return jsonResponse({ error: "Origem não autorizada." }, 403);
  }

  if (!request.headers.get("Content-Type")?.toLowerCase().startsWith("application/json")) {
    return jsonResponse({ error: "Formato de envio inválido." }, 415);
  }

  const declaredSize = Number(request.headers.get("Content-Length") || 0);
  if (declaredSize > MAX_APPLICATION_BYTES) {
    return jsonResponse({ error: "O formulário excede o tamanho permitido." }, 413);
  }

  const rawBody = await request.text();
  if (rawBody.length > MAX_APPLICATION_BYTES) {
    return jsonResponse({ error: "O formulário excede o tamanho permitido." }, 413);
  }

  let application: unknown;
  try {
    application = JSON.parse(rawBody);
  } catch {
    return jsonResponse({ error: "Não foi possível interpretar o formulário." }, 400);
  }

  if (!isValidApplication(application)) {
    return jsonResponse({ error: "Revise os campos e tente novamente." }, 400);
  }

  if (!env.RESEND_API_KEY) {
    return jsonResponse({ error: "O envio de candidaturas ainda não está configurado." }, 503);
  }

  const rows = fieldLabels.map(([field, label]) => {
    const value = formatApplicationField(field, application[field]);
    return `<tr><th align="left" style="padding:8px 12px;border-bottom:1px solid #e7e7e7;vertical-align:top">${escapeHtml(label)}</th><td style="padding:8px 12px;border-bottom:1px solid #e7e7e7;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`;
  }).join("");
  const text = fieldLabels
    .map(([field, label]) => `${label}: ${formatApplicationField(field, application[field])}`)
    .join("\n\n");

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
      "User-Agent": "coderszoom-mentoria/1.0",
    },
    body: JSON.stringify({
      from: env.RESEND_FROM_EMAIL || DEFAULT_RESEND_SENDER,
      to: [APPLICATION_RECIPIENT],
      reply_to: application.email,
      subject: `Nova candidatura — ${application.name.replace(/[\r\n]/g, " ").slice(0, 120)}`,
      html: `<h1>Nova candidatura para a mentoria</h1><table style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif;font-size:14px">${rows}</table>`,
      text: `Nova candidatura para a mentoria\n\n${text}`,
    }),
  });

  if (!resendResponse.ok) {
    console.error("Resend recusou o envio da candidatura.", resendResponse.status);
    return jsonResponse({ error: "Não foi possível enviar sua candidatura agora." }, 502);
  }

  return jsonResponse({ ok: true }, 201);
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/candidatura") {
      return handleApplication(request, env);
    }

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
