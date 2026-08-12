import type { Metadata } from "next";
import { ApplicationForm } from "./components/ApplicationForm";
import { MobileMenu } from "./components/MobileMenu";
import {
  audienceCards,
  faq,
  journey,
  siteConfig,
  testimonials,
} from "../content/site";

export const metadata: Metadata = {
  title: "Mentoria de Tecnologia e Negócios | Coders Zoom",
  description:
    "Mentoria individual para profissionais e fundadores de tecnologia que querem criar uma oferta clara, validar seu produto e conquistar clientes.",
  alternates: { canonical: "/" },
};

const problems = [
  "Construir antes de validar",
  "Ter dificuldade para escolher um público",
  "Não conseguir explicar o valor do produto",
  "Cobrar com base em horas ou esforço técnico",
  "Depender de indicações",
  "Ter muitas ideias e pouca prioridade",
  "Não saber como conquistar os primeiros clientes",
];

const beforeAfter = {
  before: ["Muitas ideias", "Posicionamento confuso", "Produto sem validação", "Dificuldade para vender", "Decisões baseadas só em intuição"],
  after: ["Público e problema definidos", "Oferta compreensível", "Plano de validação", "Processo comercial inicial", "Prioridades para os próximos 90 dias"],
};

const deliverables = [
  "Posicionamento",
  "Cliente ideal",
  "Oferta e preço",
  "Plano de validação",
  "Aquisição de clientes",
  "Priorização de produto",
  "Indicadores essenciais",
  "Plano de 90 dias",
];

export default function Home() {
  const mentorHasPhoto = !siteConfig.mentor.photo.startsWith("[");
  const mentorHasLinkedIn = !siteConfig.mentor.linkedIn.startsWith("[");
  const investmentCopy =
    siteConfig.investment.mode === "initial-price"
      ? `Investimento do ciclo inicial: ${siteConfig.investment.initialPrice}`
      : "Valores e condições são apresentados após a análise da candidatura.";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Mentoria Tech que Vira Negócio",
    description:
      "Mentoria individual de oito semanas para profissionais e fundadores de tecnologia.",
    provider: {
      "@type": "Organization",
      name: siteConfig.brand.name,
      url: siteConfig.brand.domain,
    },
    areaServed: "BR",
    serviceType: "Mentoria de tecnologia e negócios",
  };

  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#inicio" aria-label="Coders Zoom — início">
            <img src={siteConfig.brand.logo} width="181" height="36" alt="Coders Zoom" fetchPriority="high" decoding="async" />
          </a>
          <nav className="desktop-nav" aria-label="Navegação principal">
            <a href="#para-quem">Para quem é</a>
            <a href="#como-funciona">Como funciona</a>
            <a href="#sobre">Sobre</a>
            <a href="#perguntas">Perguntas frequentes</a>
          </nav>
          <a className="button button-header" href="#candidatura">Quero me candidatar <span aria-hidden="true">↗</span></a>
          <MobileMenu />
        </div>
      </header>

      <main id="conteudo">
        <section className="hero" id="inicio">
          <div className="hero-grid-pattern" aria-hidden="true"></div>
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow"><span></span> Mentoria individual · 8 semanas</p>
              <h1>Transforme sua capacidade técnica em um <em>negócio de verdade.</em></h1>
              <p className="hero-lead">
                Mentoria individual para profissionais e fundadores de tecnologia que querem criar uma oferta clara, validar seu produto e conquistar clientes.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#candidatura">Quero me candidatar <span aria-hidden="true">↗</span></a>
                <a className="text-link" href="#como-funciona">Conhecer a mentoria <span aria-hidden="true">↓</span></a>
              </div>
              <p className="availability"><span aria-hidden="true"></span> Acompanhamento individual <b>•</b> Poucas vagas por ciclo</p>
            </div>

            <div className="hero-visual" aria-label="Espaço reservado para a foto real do mentor">
              <div className={`mentor-photo-placeholder ${mentorHasPhoto ? "has-photo" : ""}`}>
                {mentorHasPhoto ? (
                  <img className="mentor-photo" src={siteConfig.mentor.photo} alt={`${siteConfig.mentor.name}, mentor da Coders Zoom`} width="512" height="512" fetchPriority="high" decoding="async" />
                ) : (
                  <>
                    <div className="photo-orbit orbit-one" aria-hidden="true"></div>
                    <div className="photo-orbit orbit-two" aria-hidden="true"></div>
                    <span className="photo-placeholder-label">[FOTO DO MENTOR]</span>
                  </>
                )}
                <div className="photo-caption">
                  <span>Mentoria 1:1</span>
                  <strong>{siteConfig.mentor.name}</strong>
                </div>
              </div>
              <div className="credibility-card">
                <span className="signal-dot" aria-hidden="true"></span>
                <p>{siteConfig.mentor.legalTrajectory}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="problem section" id="problema">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">O ponto de virada</p>
                <h2>Ser bom em tecnologia não ensina automaticamente a construir uma empresa.</h2>
              </div>
              <p>O salto mais difícil não é técnico. É escolher um problema relevante, organizar uma oferta e criar movimento comercial sem perder meses construindo no escuro.</p>
            </div>
            <div className="problem-list">
              {problems.map((problem, index) => (
                <div className="problem-item" key={problem}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{problem}</p>
                  <i aria-hidden="true">↘</i>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="audience section" id="para-quem">
          <div className="container">
            <div className="section-heading centered-heading">
              <p className="eyebrow">Para quem é</p>
              <h2>Para quem já sabe construir — e quer aprender a transformar isso em valor percebido.</h2>
            </div>
            <div className="audience-grid">
              {audienceCards.map((card) => (
                <article className="audience-card" key={card.marker}>
                  <span className="card-marker">{card.marker}</span>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
            <div className="not-for-you">
              <div>
                <p className="eyebrow">Filtro de alinhamento</p>
                <h3>Não é para você se...</h3>
              </div>
              <ul>
                <li>Procura uma fórmula de enriquecimento rápido.</li>
                <li>Quer terceirizar todas as decisões.</li>
                <li>Não está disposto a executar entre os encontros.</li>
                <li>Busca apenas aulas de programação.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="transformation section" id="transformacao">
          <div className="container transformation-grid">
            <div className="section-heading sticky-heading">
              <p className="eyebrow">Da complexidade à clareza</p>
              <h2>Decisões melhores mudam a qualidade do negócio.</h2>
              <p>O objetivo não é prometer um atalho. É criar critérios, testar hipóteses e sair do ciclo de improviso.</p>
            </div>
            <div className="comparison" aria-label="Comparação de antes e depois da mentoria">
              <article className="comparison-card before-card">
                <p className="comparison-label">Antes</p>
                <ul>{beforeAfter.before.map((item) => <li key={item}><span>×</span>{item}</li>)}</ul>
              </article>
              <article className="comparison-card after-card">
                <p className="comparison-label">Depois</p>
                <ul>{beforeAfter.after.map((item) => <li key={item}><span>✓</span>{item}</li>)}</ul>
              </article>
            </div>
          </div>
        </section>

        <section className="method section" id="como-funciona">
          <div className="container">
            <div className="method-intro">
              <div>
                <p className="eyebrow">Mentoria Tech que Vira Negócio</p>
                <h2>Oito semanas para organizar o que importa e colocar decisões em prática.</h2>
              </div>
              <div className="method-specs">
                <p><strong>8</strong><span>semanas de trabalho</span></p>
                <p><strong>6</strong><span>encontros individuais</span></p>
                <p><strong>90</strong><span>dias de plano futuro</span></p>
              </div>
            </div>
            <div className="journey-list">
              {journey.map(([title, text], index) => (
                <article className="journey-item" key={title}>
                  <span className="journey-number">{index + 1}</span>
                  <div><h3>{title}</h3><p>{text}</p></div>
                  <span className="journey-line" aria-hidden="true"></span>
                </article>
              ))}
            </div>
            <div className="support-strip">
              <p><span>+</span> Diagnóstico estratégico inicial</p>
              <p><span>+</span> Atividades práticas entre encontros</p>
              <p><span>+</span> Suporte assíncrono com limites definidos</p>
            </div>
          </div>
        </section>

        <section className="mentor section" id="sobre">
          <div className="container mentor-grid">
            <div className={`mentor-image-panel ${mentorHasPhoto ? "has-photo" : ""}`}>
              {mentorHasPhoto ? (
                <img className="mentor-photo" src={siteConfig.mentor.photo} alt={`${siteConfig.mentor.name}, mentor da Coders Zoom`} width="512" height="512" loading="lazy" decoding="async" />
              ) : (
                <span>[FOTO REAL DO MENTOR]</span>
              )}
              <div className="mentor-image-meta"><small>Mentor</small><strong>{siteConfig.mentor.name}</strong></div>
            </div>
            <div className="mentor-copy">
              <p className="eyebrow">Sobre o mentor</p>
              <h2>Experiência prática, compartilhada sem fórmulas prontas.</h2>
              <p>Sou líder de tecnologia e empreendedor com mais de 20 anos de experiência em engenharia de software, arquitetura e construção de produtos digitais. Minha trajetória combina liderança de pessoas, visão de negócio e proximidade técnica para transformar problemas complexos em soluções escaláveis.</p>
              <p>Como cofundador e CTO da Ductor e da Grão, ex-Head de Tecnologia do Grupo Primo e ex-Head of Engineering no Moip, estruturei times, desenvolvi lideranças e participei da evolução de produtos nos mercados de pagamentos, investimentos e serviços financeiros.</p>
              <p>Nesta mentoria, compartilho os aprendizados práticos dessa jornada para ajudar outros profissionais técnicos a tomar decisões melhores, evitar erros comuns e construir negócios mais consistentes.</p>
              <blockquote>“{siteConfig.mentor.legalTrajectory}”</blockquote>
              <div className="mentor-placeholders" aria-label="Experiência do mentor">
                <span>{siteConfig.mentor.relevantExperience}</span>
                <span>{siteConfig.mentor.authorizedProjects}</span>
                <span>{siteConfig.mentor.mediaAppearances}</span>
              </div>
              {mentorHasLinkedIn ? (
                <a className="mentor-link" href={siteConfig.mentor.linkedIn} target="_blank" rel="noreferrer">Conectar com Breno no LinkedIn ↗</a>
              ) : (
                <span className="disabled-link" aria-disabled="true">LinkedIn será adicionado após confirmação ↗</span>
              )}
            </div>
          </div>
        </section>

        <section className="deliverables section" id="aplicacao-pratica">
          <div className="container">
            <div className="section-heading split-heading">
              <div><p className="eyebrow">Aplicação prática</p><h2>Você termina o ciclo com decisões documentadas — não com mais conteúdo acumulado.</h2></div>
              <p>Cada frente é trabalhada no contexto real do seu negócio, respeitando estágio, recursos e restrições.</p>
            </div>
            <div className="deliverable-grid">
              {deliverables.map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>)}
            </div>
          </div>
        </section>

        <section className="first-cycle section" id="primeiro-ciclo">
          <div className="container first-cycle-inner">
            {testimonials.length > 0 ? (
              <div className="testimonial-grid">
                {testimonials.filter((item) => item.displayAuthorized).map((item) => (
                  <blockquote key={item.name}><p>“{item.quote}”</p><footer>{item.name} · {item.role}, {item.company}</footer></blockquote>
                ))}
              </div>
            ) : (
              <>
                <p className="eyebrow">Turma fundadora</p>
                <h2>Primeiro ciclo da mentoria.</h2>
                <p>As primeiras vagas terão acompanhamento especialmente próximo do mentor e participação na evolução do método — sempre com decisões aplicadas a negócios reais.</p>
                <div className="cycle-note"><span aria-hidden="true">◎</span><p>Sem depoimentos inventados. Resultados e relatos só serão publicados com autorização expressa.</p></div>
              </>
            )}
          </div>
        </section>

        <section className="apply section" id="candidatura">
          <div className="container apply-grid">
            <div className="apply-copy">
              <p className="eyebrow">Candidatura</p>
              <h2>Vamos entender se este é o momento certo para o seu negócio.</h2>
              <p>Conte onde você está e o que precisa destravar. A candidatura é analisada antes de qualquer conversa sobre pagamento.</p>
              <div className="investment-card">
                <small>Investimento</small>
                <strong>{investmentCopy}</strong>
                {siteConfig.investment.mode === "initial-price" && <span>{siteConfig.investment.installmentDetails}</span>}
              </div>
              <p className="limited-note"><span aria-hidden="true">◆</span> As vagas são limitadas porque todos os encontros são conduzidos individualmente.</p>
            </div>
            <ApplicationForm />
          </div>
        </section>

        <section className="faq section" id="perguntas">
          <div className="container faq-grid">
            <div className="section-heading sticky-heading">
              <p className="eyebrow">Perguntas frequentes</p>
              <h2>Clareza antes da candidatura.</h2>
              <p>O processo começa com alinhamento de expectativas — e continua assim durante todo o ciclo.</p>
            </div>
            <div className="faq-list">
              {faq.map((item, index) => (
                <details key={item.question} open={index === 0}>
                  <summary><span>{item.question}</span><i aria-hidden="true">+</i></summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="final-cta section">
          <div className="container final-cta-inner">
            <div className="final-cta-signal" aria-hidden="true"><span></span><span></span><span></span></div>
            <p className="eyebrow">Seu próximo ciclo começa com uma decisão</p>
            <h2>Você já sabe construir tecnologia. <em>Agora é hora de construir o negócio.</em></h2>
            <a className="button button-primary" href="#candidatura">Quero me candidatar <span aria-hidden="true">↗</span></a>
          </div>
        </section>

        <section className="legal-notes" aria-label="Informações legais">
          <div className="container legal-grid">
            <a className="legal-note-link" href={siteConfig.links.privacyPolicy}><span>Privacidade</span><h2>Política de Privacidade</h2><p>Como coletamos, utilizamos, protegemos e eliminamos dados pessoais.</p><i aria-hidden="true">↗</i></a>
            <a className="legal-note-link" href={siteConfig.links.terms}><span>Condições</span><h2>Termos de Uso e da Mentoria</h2><p>Regras do site, da candidatura e da prestação da mentoria individual.</p><i aria-hidden="true">↗</i></a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-top">
          <img src={siteConfig.brand.logo} width="181" height="36" alt="Coders Zoom" loading="lazy" decoding="async" />
          <p>Tecnologia é só o começo.</p>
          <nav aria-label="Links legais"><a href={siteConfig.links.privacyPolicy}>Política de Privacidade</a><a href={siteConfig.links.terms}>Termos de Uso</a></nav>
        </div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} Coders Zoom.</span><span>Mentoria de tecnologia e negócios.</span></div>
      </footer>

      <a className="mobile-apply-bar" href="#candidatura">Quero me candidatar <span aria-hidden="true">↗</span></a>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </>
  );
}
