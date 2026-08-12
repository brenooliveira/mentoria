import type { ReactNode } from "react";
import { companyConfig, siteConfig } from "../../content/site";

export function LegalPage({
  eyebrow,
  title,
  summary,
  updatedAt,
  children,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  updatedAt: string;
  children: ReactNode;
}) {
  return (
    <>
      <header className="legal-header">
        <div className="container legal-header-inner">
          {/* A navegação completa evita falhas do roteador cliente ao sair das páginas legais. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/#inicio" aria-label="Coders Zoom — voltar à página inicial">
            <img src={siteConfig.brand.logo} width="181" height="36" alt="Coders Zoom" fetchPriority="high" decoding="async" />
          </a>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a className="legal-back" href="/#inicio">← Voltar para a mentoria</a>
        </div>
      </header>
      <main className="legal-page">
        <section className="legal-hero">
          <div className="container legal-hero-inner">
            <p className="eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
            <p>{summary}</p>
            <span>Última atualização: {updatedAt}</span>
          </div>
        </section>
        <div className="container legal-content-grid">
          <aside className="legal-company-card" aria-label="Identificação da empresa">
            <p className="eyebrow">Responsável</p>
            <strong>{companyConfig.legalName}</strong>
            <dl>
              <div><dt>CNPJ</dt><dd>{companyConfig.cnpj}</dd></div>
              <div><dt>Endereço</dt><dd>{companyConfig.address}</dd></div>
              <div><dt>Contato</dt><dd><a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a></dd></div>
            </dl>
          </aside>
          <article className="legal-document">{children}</article>
        </div>
      </main>
      <footer className="legal-footer">
        <div className="container">
          <span>© {new Date().getFullYear()} Coders Zoom</span>
          <nav aria-label="Documentos legais">
            <a href={siteConfig.links.privacyPolicy}>Política de Privacidade</a>
            <a href={siteConfig.links.terms}>Termos de Uso</a>
          </nav>
        </div>
      </footer>
    </>
  );
}
