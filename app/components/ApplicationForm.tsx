"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { siteConfig } from "../../content/site";
import {
  ApplicationSubmission,
  createApplicationGateway,
} from "../../lib/application";

type FormStatus = "idle" | "submitting" | "success" | "error";
type Step = 1 | 2;
type FieldName =
  | "name"
  | "email"
  | "whatsapp"
  | "linkedin"
  | "role"
  | "company"
  | "stage"
  | "challenge"
  | "goal90Days"
  | "investmentReadiness"
  | "source"
  | "consent";
type FieldErrors = Partial<Record<FieldName, string>>;

const fieldClass = "field-control";
const stepOneFields: FieldName[] = ["name", "email", "whatsapp", "role", "linkedin"];
const stepTwoFields: FieldName[] = ["stage", "challenge", "goal90Days", "investmentReadiness", "consent"];

export function ApplicationForm() {
  const [step, setStep] = useState<Step>(1);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const startedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const gateway = useMemo(() => createApplicationGateway(siteConfig.form), []);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  function moveToStep(nextStep: Step) {
    setStep(nextStep);
    setStatus("idle");
    setError("");
    window.requestAnimationFrame(() => stepHeadingRef.current?.focus());
  }

  function continueToStepTwo() {
    const form = formRef.current;
    if (!form) return;
    const nextErrors = validateFields(form, stepOneFields);
    if (Object.keys(nextErrors).length > 0) {
      showValidationErrors(nextErrors, 1);
      return;
    }
    moveToStep(2);
  }

  function showValidationErrors(nextErrors: FieldErrors, errorStep: Step) {
    const firstInvalid = Object.keys(nextErrors)[0] as FieldName | undefined;
    setFieldErrors((current) => ({ ...current, ...nextErrors }));
    setStatus("error");
    setError("Revise os campos obrigatórios destacados antes de continuar.");
    if (step !== errorStep) setStep(errorStep);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        if (firstInvalid) document.getElementById(firstInvalid)?.focus();
      });
    });
  }

  function clearFieldError(name: FieldName) {
    if (!fieldErrors[name]) return;
    setFieldErrors((current) => {
      const next = { ...current };
      delete next[name];
      return next;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (data.get("website") || Date.now() - startedAt.current < 1500) {
      setStatus("error");
      setError("Não foi possível validar o envio. Revise os campos e tente novamente.");
      return;
    }

    const allErrors = validateFields(form, [...stepOneFields, ...stepTwoFields]);
    if (Object.keys(allErrors).length > 0) {
      const firstField = Object.keys(allErrors)[0] as FieldName;
      showValidationErrors(allErrors, stepOneFields.includes(firstField) ? 1 : 2);
      return;
    }

    const application = Object.fromEntries(data.entries()) as Record<string, string>;
    const payload: ApplicationSubmission = {
      name: application.name,
      email: application.email,
      whatsapp: application.whatsapp,
      linkedin: application.linkedin || "",
      role: application.role,
      company: application.company || "",
      stage: application.stage,
      challenge: application.challenge,
      goal90Days: application.goal90Days,
      investmentReadiness: application.investmentReadiness,
      source: application.source || "",
      consent: application.consent === "on",
      website: application.website,
      startedAt: startedAt.current,
    };

    setStatus("submitting");
    setError("");

    try {
      await gateway.submit(payload);
      form.reset();
      setFieldErrors({});
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
      <div className="form-success" role="status" tabIndex={-1} ref={successRef}>
        <span className="success-mark" aria-hidden="true">✓</span>
        <p className="eyebrow">Próximo passo</p>
        <h3>Candidatura recebida.</h3>
        <p>Vamos analisar suas respostas e entrar em contato pelo WhatsApp ou e-mail.</p>
        {siteConfig.form.mode === "preview" && (
          <p className="preview-note">Modo de revisão: este envio foi simulado e nenhum dado foi transmitido.</p>
        )}
        <button
          className="text-button"
          type="button"
          onClick={() => {
            startedAt.current = Date.now();
            setStep(1);
            setStatus("idle");
          }}
        >
          Preencher uma nova candidatura
        </button>
      </div>
    );
  }

  return (
    <form className="application-form" onSubmit={handleSubmit} noValidate ref={formRef}>
      {siteConfig.form.mode === "preview" && (
        <p className="preview-banner" role="note">
          <strong>Formulário em modo de revisão.</strong> Os dados não serão enviados até a integração ser configurada.
        </p>
      )}

      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Não preencha este campo</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form-progress" aria-label={`Etapa ${step} de 2`}>
        <span>Etapa {step} de 2</span>
        <div aria-hidden="true"><i style={{ width: `${step * 50}%` }} /></div>
      </div>

      <section className="form-step" hidden={step !== 1} aria-labelledby="form-step-one-title">
        <h3 id="form-step-one-title" tabIndex={-1} ref={step === 1 ? stepHeadingRef : undefined}>Sobre você</h3>
        <p>Comece com seus dados de contato e contexto profissional.</p>
        <div className="form-grid">
          <Field label="Nome" name="name" autoComplete="name" error={fieldErrors.name} onCorrect={clearFieldError} />
          <Field label="E-mail" name="email" type="email" autoComplete="email" error={fieldErrors.email} onCorrect={clearFieldError} />
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
            error={fieldErrors.whatsapp}
            onCorrect={clearFieldError}
          />
          <Field label="Cargo ou ocupação" name="role" autoComplete="organization-title" error={fieldErrors.role} onCorrect={clearFieldError} />
          <Field label="LinkedIn" name="linkedin" type="url" placeholder="https://linkedin.com/in/seu-perfil" optional error={fieldErrors.linkedin} onCorrect={clearFieldError} />
          <Field label="Empresa ou projeto" name="company" autoComplete="organization" optional onCorrect={clearFieldError} />
        </div>
        {status === "error" && error && step === 1 && <p className="form-error" role="alert">{error}</p>}
        <button className="button button-primary form-next-button" type="button" onClick={continueToStepTwo}>
          Continuar <span aria-hidden="true">→</span>
        </button>
      </section>

      <section className="form-step" hidden={step !== 2} aria-labelledby="form-step-two-title">
        <h3 id="form-step-two-title" tabIndex={-1} ref={step === 2 ? stepHeadingRef : undefined}>Sobre o momento atual</h3>
        <p>Conte o que precisa destravar para avaliarmos o alinhamento.</p>
        <div className="form-grid">
          <SelectField label="Em que estágio está o negócio?" name="stage" error={fieldErrors.stage} onCorrect={clearFieldError} options={[
            "Ainda é uma ideia",
            "Estou validando o problema",
            "Já existe um produto inicial",
            "Já tenho clientes",
            "Tenho uma operação em andamento",
          ]} />
          <TextArea label="Principal desafio atual" name="challenge" error={fieldErrors.challenge} onCorrect={clearFieldError} />
          <TextArea label="O que deseja alcançar nos próximos 90 dias?" name="goal90Days" error={fieldErrors.goal90Days} onCorrect={clearFieldError} />
          <SelectField label="Disponibilidade para investir na mentoria" name="investmentReadiness" error={fieldErrors.investmentReadiness} onCorrect={clearFieldError} options={[...siteConfig.investment.readinessOptions]} />
          <SelectField label="Como conheceu a Coders Zoom?" name="source" optional onCorrect={clearFieldError} options={[
            "Indicação",
            "LinkedIn",
            "Evento, entrevista ou podcast",
            "Busca na internet",
            "Outro canal",
          ]} />
        </div>

        <div className="consent-wrapper">
          <label className="consent-field" htmlFor="consent">
            <input
              id="consent"
              name="consent"
              type="checkbox"
              required
              aria-invalid={fieldErrors.consent ? "true" : undefined}
              aria-describedby={fieldErrors.consent ? "consent-error" : undefined}
              onChange={() => clearFieldError("consent")}
            />
            <span>
              Autorizo o contato e o tratamento dos dados enviados para análise da candidatura, de acordo com a <a href={siteConfig.links.privacyPolicy} target="_blank" rel="noopener noreferrer">Política de Privacidade</a>.
            </span>
          </label>
          {fieldErrors.consent && <FieldError name="consent" message={fieldErrors.consent} />}
        </div>

        {status === "error" && error && step === 2 && <p className="form-error" role="alert">{error}</p>}

        <div className="form-actions">
          <button className="form-back-button" type="button" onClick={() => moveToStep(1)} disabled={status === "submitting"}>← Voltar</button>
          <button className="button button-primary submit-button" type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? "Enviando candidatura..." : "Enviar candidatura"}
            <span aria-hidden="true">↗</span>
          </button>
        </div>
      </section>

      <p className="form-footnote">Seus dados não serão exibidos publicamente nem usados para envio de spam.</p>
    </form>
  );
}

function validateFields(form: HTMLFormElement, fields: FieldName[]) {
  const errors: FieldErrors = {};
  for (const name of fields) {
    const element = form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;
    if (!element) continue;
    const value = element.type === "checkbox" ? (element as HTMLInputElement).checked : element.value.trim();

    if (name === "name" && !value) errors.name = "Informe seu nome.";
    if (name === "email" && (typeof value !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))) errors.email = "Informe um e-mail válido.";
    if (name === "whatsapp") {
      const digits = typeof value === "string" ? value.replace(/\D/g, "") : "";
      if (digits.length !== 10 && digits.length !== 11) errors.whatsapp = "Informe um WhatsApp com DDD.";
    }
    if (name === "linkedin" && value && typeof value === "string" && !isValidWebUrl(value)) errors.linkedin = "Informe uma URL válida ou deixe o campo em branco.";
    if (name === "role" && !value) errors.role = "Informe seu cargo ou ocupação.";
    if (name === "stage" && !value) errors.stage = "Selecione o estágio atual.";
    if (name === "challenge" && (typeof value !== "string" || value.length < 20)) errors.challenge = "Conte brevemente seu principal desafio.";
    if (name === "goal90Days" && (typeof value !== "string" || value.length < 20)) errors.goal90Days = "Conte o que deseja alcançar nos próximos 90 dias.";
    if (name === "investmentReadiness" && !value) errors.investmentReadiness = "Selecione sua disponibilidade de investimento.";
    if (name === "consent" && value !== true) errors.consent = "Você precisa autorizar o tratamento dos dados para enviar a candidatura.";
  }
  return errors;
}

function isValidWebUrl(value: string) {
  try {
    return /^https?:$/.test(new URL(value).protocol);
  } catch {
    return false;
  }
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
  optional = false,
  error,
  onCorrect,
}: {
  label: string;
  name: FieldName;
  type?: string;
  autoComplete?: string;
  inputMode?: "numeric";
  maxLength?: number;
  pattern?: string;
  placeholder?: string;
  title?: string;
  transformValue?: (value: string) => string;
  optional?: boolean;
  error?: string;
  onCorrect: (name: FieldName) => void;
}) {
  return (
    <label className="field" htmlFor={name}>
      <span className="field-label">{label}{optional && <small>Opcional</small>}</span>
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
        required={!optional}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        onInput={(event) => {
          if (transformValue) event.currentTarget.value = transformValue(event.currentTarget.value);
          onCorrect(name);
        }}
      />
      {error && <FieldError name={name} message={error} />}
    </label>
  );
}

function SelectField({ label, name, options, optional = false, error, onCorrect }: {
  label: string;
  name: FieldName;
  options: string[];
  optional?: boolean;
  error?: string;
  onCorrect: (name: FieldName) => void;
}) {
  return (
    <label className="field full-field" htmlFor={name}>
      <span className="field-label">{label}{optional && <small>Opcional</small>}</span>
      <select
        className={fieldClass}
        id={name}
        name={name}
        required={!optional}
        defaultValue=""
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        onChange={() => onCorrect(name)}
      >
        <option value="">Selecione uma opção</option>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
      {error && <FieldError name={name} message={error} />}
    </label>
  );
}

function TextArea({ label, name, error, onCorrect }: {
  label: string;
  name: "challenge" | "goal90Days";
  error?: string;
  onCorrect: (name: FieldName) => void;
}) {
  return (
    <label className="field full-field" htmlFor={name}>
      <span className="field-label">{label}</span>
      <textarea
        className={fieldClass}
        id={name}
        name={name}
        rows={4}
        minLength={20}
        required
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        onInput={() => onCorrect(name)}
      />
      {error && <FieldError name={name} message={error} />}
    </label>
  );
}

function FieldError({ name, message }: { name: FieldName; message: string }) {
  return <small className="field-error" id={`${name}-error`}><span aria-hidden="true">!</span>{message}</small>;
}

function formatBrazilianPhone(value: string) {
  let digits = value.replace(/\D/g, "");
  if (digits.length > 11 && digits.startsWith("55")) digits = digits.slice(2);
  digits = digits.slice(0, 11);
  if (!digits) return "";
  if (digits.length < 3) return `(${digits}`;

  const areaCode = digits.slice(0, 2);
  const subscriber = digits.slice(2);
  if (subscriber.length <= 4) return `(${areaCode}) ${subscriber}`;

  const prefixLength = subscriber.length > 8 ? 5 : 4;
  return `(${areaCode}) ${subscriber.slice(0, prefixLength)}-${subscriber.slice(prefixLength)}`;
}
