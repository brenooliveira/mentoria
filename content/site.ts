export type Testimonial = {
  name: string;
  role: string;
  company: string;
  photo: string;
  quote: string;
  displayAuthorized: boolean;
};

export const siteConfig = {
  brand: {
    name: "Coders Zoom",
    domain: "https://coderszoom.com.br",
    logo: "/coderszoom.png",
    primaryColor: "#26ade3",
    inkColor: "#2d2731",
  },
  mentor: {
    name: "[NOME DO MENTOR]",
    photo: "[FOTO DO MENTOR]",
    linkedIn: "[URL DO LINKEDIN]",
    legalTrajectory:
      "Aprendizados de quem construiu uma empresa de tecnologia e participou de um processo de negociação com o Grupo Primo.",
    relevantExperience: "[EXPERIÊNCIAS RELEVANTES]",
    authorizedProjects: "[EMPRESAS OU PROJETOS AUTORIZADOS]",
    mediaAppearances: "[EVENTOS, ENTREVISTAS OU PODCASTS]",
  },
  investment: {
    mode: "after-application" as "after-application" | "initial-price",
    initialPrice: "[PREÇO]",
    installmentDetails: "[CONDIÇÕES DE PARCELAMENTO]",
    availableSpots: "[NÚMERO DE VAGAS]",
  },
  contact: {
    whatsapp: "[WHATSAPP]",
    email: "[E-MAIL]",
  },
  links: {
    privacyPolicy: "[LINK DA POLÍTICA DE PRIVACIDADE]",
    terms: "[LINK DOS TERMOS]",
  },
  form: {
    mode: "preview" as "preview" | "endpoint",
    destination: "[DESTINO DO FORMULÁRIO]",
  },
  socialImage: "/og.png",
} as const;

export const testimonials: Testimonial[] = [];

export const audienceCards = [
  {
    marker: "01",
    title: "Profissional de tecnologia",
    text: "Você domina a parte técnica e quer transformar essa capacidade em uma oferta que alguém entenda e compre.",
  },
  {
    marker: "02",
    title: "Fundador técnico",
    text: "Você já começou um produto, mas precisa validar o problema e tomar decisões comerciais com mais critério.",
  },
  {
    marker: "03",
    title: "Dono de software house",
    text: "Você quer sair da venda puramente por hora e construir uma oferta mais clara, previsível e valorizada.",
  },
  {
    marker: "04",
    title: "Criador de SaaS",
    text: "Você busca clareza de público, proposta de valor e um caminho realista para conquistar clientes.",
  },
];

export const journey = [
  ["Diagnóstico e objetivo", "Entender o cenário, as restrições e o resultado prioritário do ciclo."],
  ["Público e posicionamento", "Escolher para quem criar valor e como tornar esse valor fácil de compreender."],
  ["Oferta e modelo de receita", "Organizar escopo, preço e lógica de entrega sem depender apenas de esforço técnico."],
  ["Validação e clientes", "Desenhar testes práticos e um processo inicial de aquisição e conversa comercial."],
  ["Produto, processos e indicadores", "Definir o que construir, o que medir e o que deixar para depois."],
  ["Crescimento e execução", "Consolidar prioridades em um plano objetivo para os 90 dias seguintes."],
] as const;

export const faq = [
  {
    question: "Preciso já ter uma empresa?",
    answer:
      "Não. A mentoria atende tanto quem ainda está estruturando a primeira oferta quanto quem já possui um produto, SaaS ou software house em estágio inicial.",
  },
  {
    question: "A mentoria serve para quem ainda está empregado?",
    answer:
      "Sim, desde que exista disponibilidade real para executar as atividades entre os encontros e avançar no projeto com consistência.",
  },
  {
    question: "É uma mentoria de programação?",
    answer:
      "Não. O foco é transformar capacidade técnica em oferta, validação, processo comercial e decisões de negócio. Não há aulas para aprender a programar.",
  },
  {
    question: "Como funcionam os encontros?",
    answer:
      "São seis encontros individuais ao longo de oito semanas, além de um diagnóstico estratégico inicial. A agenda e a duração de cada encontro serão alinhadas na aprovação da candidatura.",
  },
  {
    question: "Terei atividades entre os encontros?",
    answer:
      "Sim. Cada etapa se conecta a uma atividade prática. A qualidade da mentoria depende da aplicação dessas decisões no contexto real do participante.",
  },
  {
    question: "Existe garantia de faturamento ou venda da empresa?",
    answer:
      "Não. A mentoria oferece orientação, método e acompanhamento. Resultados dependem do contexto, das decisões e da execução de cada participante.",
  },
  {
    question: "Como funciona o processo de candidatura?",
    answer:
      "Você envia o formulário, as respostas são analisadas e, se houver alinhamento com a proposta, o contato continua por WhatsApp ou e-mail antes de qualquer pagamento.",
  },
  {
    question: "Quantas vagas estão disponíveis?",
    answer: `O número final ainda será confirmado (${siteConfig.investment.availableSpots}). As vagas são limitadas porque todos os encontros são individuais.`,
  },
];
