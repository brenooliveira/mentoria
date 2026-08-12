"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { siteConfig } from "../../content/site";
import {
  ApplicationSubmission,
  createApplicationGateway,
} from "../../lib/application";

type FormStatus = "idle" | "submitting" | "success" | "error";

const fieldClass = "field-control";

export function ApplicationForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");
  const startedAt = useRef(0);
  const gateway = useMemo(
    () => createApplicationGateway(siteConfig.form),
    [],
  );

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (data.get("website") || Date.now() - startedAt.current < 1500) {
      setStatus("error");
      setError("Não foi possível validar o envio. Revise os campos e tente novamente.");
      return;
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      setStatus("error");
      setError("Revise os campos obrigatórios destacados antes de continuar.");
      return;
    }

    const application = Object.fromEntries(data.entries()) as Record<string, string>;
    const payload: ApplicationSubmission = {
      name: application.name,
      email: application.email,
      whatsapp: application.whatsapp,
      linkedin: application.linkedin,
      role: application.role,
      company: application.company,
      stage: application.stage,
      challenge: application.challenge,
      goal90Days: application.goal90Days,
      investmentReadiness: application.investmentReadiness,
      source: application.source,
      consent: application.consent === "on",
      website: application.website,
      startedAt: startedAt.current,
    };

    setStatus("submitting");
    setError("");

    try {
      await gateway.submit(payload);
      form.reset();
      setStatus("success");
    } catch (submissionError) {
      setStatus("error");
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Não foi possível enviar agora. Tente novamente em alguns instantes.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="form-success" role="status" tabIndex={-1}>
        <span className="success-mark" aria-hidden="true">✓</span>
        <p className="eyebrow">Próximo passo</p>
        <h3>Candidatura recebida.</h3>
        <p>
          Vamos analisar suas respostas e entrar em contato pelo WhatsApp ou e-mail.
        </p>
        {siteConfig.form.mode === "preview" && (
          <p className="preview-note">
            Modo de revisão: este envio foi simulado e nenhum dado foi transmitido.
          </p>
        )}
        <button
          className="text-button"
          type="button"
          onClick={() => {
            startedAt.current = Date.now();
            setStatus("idle");
          }}
        >
          Preencher uma nova candidatura
        </button>
      </div>
    );
  }

  return (
    <form className="application-form" onSubmit={handleSubmit} noValidate>
      {siteConfig.form.mode === "preview" && (
        <p className="preview-banner" role="note">
          <strong>Formulário em modo de revisão.</strong> Os dados não serão enviados até a integração ser configurada.
        </p>
      )}

      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Não preencha este campo</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form-grid">
        <Field label="Nome" name="name" autoComplete="name" />
        <Field label="E-mail" name="email" type="email" autoComplete="email" />
        <Field
          label="WhatsApp"
          name="whatsapp"
          type="tel"
          autoComplete="tel"
          inputMode="numeric"
          maxLength={15}
          pattern={"\\(\\d{2}\\) \\d{4,5}-\\d{4}"}
          placeholder="(00) 00000-0000"
          title="Informe o telefone com DDD"
          transformValue={formatBrazilianPhone}
        />
        <Field label="LinkedIn" name="linkedin" type="url" placeholder="https://linkedin.com/in/seu-perfil" />
        <Field label="Cargo ou ocupação" name="role" autoComplete="organization-title" />
        <Field label="Empresa ou projeto" name="company" autoComplete="organization" />

        <label className="field full-field" htmlFor="stage">
          <span>Em que estágio está o negócio?</span>
          <select className={fieldClass} id="stage" name="stage" required defaultValue="">
            <option value="" disabled>Selecione uma opção</option>
            <option>Ainda é uma ideia</option>
            <option>Estou validando o problema</option>
            <option>Já existe um produto inicial</option>
            <option>Já tenho clientes</option>
            <option>Tenho uma operação em andamento</option>
          </select>
        </label>

        <TextArea label="Principal desafio atual" name="challenge" />
        <TextArea label="O que deseja alcançar nos próximos 90 dias?" name="goal90Days" />

        <label className="field" htmlFor="investmentReadiness">
          <span>Disponibilidade para investir na mentoria</span>
          <select className={fieldClass} id="investmentReadiness" name="investmentReadiness" required defaultValue="">
            <option value="" disabled>Selecione uma opção</option>
            <option>Posso investir agora, se houver alinhamento</option>
            <option>Preciso entender valores e condições</option>
            <option>Estou me planejando para investir</option>
          </select>
        </label>

        <label className="field" htmlFor="source">
          <span>Como conheceu a Coders Zoom?</span>
          <select className={fieldClass} id="source" name="source" required defaultValue="">
            <option value="" disabled>Selecione uma opção</option>
            <option>Indicação</option>
            <option>LinkedIn</option>
            <option>Evento, entrevista ou podcast</option>
            <option>Busca na internet</option>
            <option>Outro canal</option>
          </select>
        </label>
      </div>

      <label className="consent-field" htmlFor="consent">
        <input id="consent" name="consent" type="checkbox" required />
        <span>
          Autorizo o contato e o tratamento dos dados enviados para análise da candidatura, de acordo com a <a href={siteConfig.links.privacyPolicy} target="_blank" rel="noreferrer">Política de Privacidade</a>.
        </span>
      </label>

      {status === "error" && <p className="form-error" role="alert">{error}</p>}

      <button className="button button-primary submit-button" type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Enviando candidatura..." : "Enviar candidatura"}
        <span aria-hidden="true">↗</span>
      </button>
      <p className="form-footnote">Seus dados não serão exibidos publicamente nem usados para envio de spam.</p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  inputMode,
  maxLength,
  pattern,
  placeholder,
  title,
  transformValue,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  inputMode?: "numeric";
  maxLength?: number;
  pattern?: string;
  placeholder?: string;
  title?: string;
  transformValue?: (value: string) => string;
}) {
  return (
    <label className="field" htmlFor={name}>
      <span>{label}</span>
      <input
        className={fieldClass}
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={maxLength}
        pattern={pattern}
        placeholder={placeholder}
        title={title}
        required
        onInput={transformValue ? (event) => {
          event.currentTarget.value = transformValue(event.currentTarget.value);
        } : undefined}
      />
    </label>
  );
}

function formatBrazilianPhone(value: string) {
  let digits = value.replace(/\D/g, "");

  if (digits.length > 11 && digits.startsWith("55")) {
    digits = digits.slice(2);
  }

  digits = digits.slice(0, 11);
  if (!digits) return "";
  if (digits.length < 3) return `(${digits}`;

  const areaCode = digits.slice(0, 2);
  const subscriber = digits.slice(2);
  if (subscriber.length <= 4) return `(${areaCode}) ${subscriber}`;

  const prefixLength = subscriber.length > 8 ? 5 : 4;
  return `(${areaCode}) ${subscriber.slice(0, prefixLength)}-${subscriber.slice(prefixLength)}`;
}

function TextArea({ label, name }: { label: string; name: string }) {
  return (
    <label className="field full-field" htmlFor={name}>
      <span>{label}</span>
      <textarea className={fieldClass} id={name} name={name} rows={4} minLength={20} required />
    </label>
  );
}
