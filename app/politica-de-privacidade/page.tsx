import type { Metadata } from "next";
import { LegalPage } from "../components/LegalPage";
import { companyConfig, siteConfig } from "../../content/site";

export const metadata: Metadata = {
  title: "Política de Privacidade | Coders Zoom",
  description: "Saiba como a Coders Zoom coleta, utiliza, protege e elimina dados pessoais.",
  alternates: { canonical: "/politica-de-privacidade" },
};

export default function PrivacyPolicy() {
  return (
    <LegalPage
      eyebrow="Privacidade e proteção de dados"
      title="Política de Privacidade"
      summary="Este documento explica, de forma clara, como tratamos os dados de visitantes, candidatos e participantes da Mentoria Tech que Vira Negócio."
      updatedAt="12 de agosto de 2026"
    >
      <section id="controlador">
        <h2>1. Quem controla os dados</h2>
        <p>A controladora dos dados pessoais é <strong>{companyConfig.legalName}</strong>, inscrita no CNPJ sob o nº <strong>{companyConfig.cnpj}</strong>, com endereço em {companyConfig.address}, responsável pela marca Coders Zoom.</p>
        <p>Dúvidas e solicitações relacionadas à privacidade podem ser enviadas para <a href={`mailto:${siteConfig.contact.privacyEmail}`}>{siteConfig.contact.privacyEmail}</a>. Esse é o canal disponibilizado para comunicação com titulares de dados e com a Autoridade Nacional de Proteção de Dados.</p>
      </section>

      <section id="dados-coletados">
        <h2>2. Quais dados tratamos</h2>
        <p>Podemos tratar as seguintes categorias de dados:</p>
        <ul>
          <li><strong>Dados de candidatura:</strong> nome, e-mail, WhatsApp, LinkedIn, cargo, ocupação, empresa ou projeto, estágio do negócio, desafios, objetivos para 90 dias, disponibilidade para investir e origem do contato.</li>
          <li><strong>Dados de comunicação:</strong> mensagens, solicitações, registros de atendimento e informações fornecidas durante conversas por e-mail ou WhatsApp.</li>
          <li><strong>Dados contratuais e financeiros:</strong> informações necessárias à contratação, faturamento, emissão de documentos fiscais e comprovação de pagamentos, quando a candidatura for aprovada.</li>
          <li><strong>Dados técnicos:</strong> endereço IP, data e hora de acesso, tipo de navegador, dispositivo e registros de segurança que possam ser processados pela infraestrutura de hospedagem.</li>
          <li><strong>Dados da mentoria:</strong> anotações necessárias ao acompanhamento, metas, atividades e informações voluntariamente compartilhadas pelo participante.</li>
        </ul>
        <p>Não solicitamos dados pessoais sensíveis no formulário. Pedimos que o candidato não inclua informações sensíveis ou dados de terceiros nas respostas, salvo quando estritamente necessário e autorizado.</p>
      </section>

      <section id="finalidades">
        <h2>3. Para que utilizamos os dados</h2>
        <ul>
          <li>receber, analisar e responder candidaturas;</li>
          <li>verificar alinhamento entre o momento do candidato e a proposta da mentoria;</li>
          <li>realizar procedimentos preliminares e, se aprovado, formalizar e executar a contratação;</li>
          <li>agendar encontros, prestar suporte e acompanhar a evolução do participante;</li>
          <li>cumprir obrigações legais, regulatórias, fiscais e contábeis;</li>
          <li>prevenir fraudes, proteger o site e exercer regularmente direitos;</li>
          <li>enviar comunicações comerciais apenas quando houver uma base legal adequada, respeitando pedidos de descadastramento.</li>
        </ul>
        <p>O tratamento pode se fundamentar no consentimento, em procedimentos preliminares solicitados pelo titular, na execução de contrato, no cumprimento de obrigação legal ou regulatória, no exercício regular de direitos e no legítimo interesse, sempre após avaliação do contexto e dos direitos do titular.</p>
      </section>

      <section id="formulario">
        <h2>4. Formulário de candidatura</h2>
        <p>As informações preenchidas no formulário são transmitidas de forma segura para análise da candidatura e encaminhadas ao e-mail de atendimento da Coders Zoom. Nesta etapa, o site não mantém uma cópia das respostas em banco de dados próprio.</p>
        <p>O preenchimento é voluntário, mas a ausência de informações obrigatórias pode impedir a avaliação da candidatura.</p>
      </section>

      <section id="compartilhamento">
        <h2>5. Com quem os dados podem ser compartilhados</h2>
        <p>Os dados podem ser acessados, dentro do necessário, por fornecedores que apoiam a operação, tais como:</p>
        <ul>
          <li>Cloudflare, para hospedagem, segurança e processamento do envio do formulário;</li>
          <li>Resend, para o envio transacional das candidaturas por e-mail;</li>
          <li>Google Gmail, para recebimento e armazenamento das mensagens encaminhadas;</li>
          <li>Google Meet, para realização dos encontros;</li>
          <li>WhatsApp, para comunicação e suporte assíncrono;</li>
          <li>prestadores de pagamento, contabilidade, assessoria jurídica e suporte tecnológico, quando aplicável;</li>
          <li>autoridades públicas, quando houver obrigação legal ou ordem válida.</li>
        </ul>
        <p>Não vendemos dados pessoais. Alguns fornecedores podem processar informações fora do Brasil. Nesses casos, adotamos fornecedores reconhecidos e medidas compatíveis com a LGPD para proteger a transferência internacional.</p>
      </section>

      <section id="cookies">
        <h2>6. Cookies e tecnologias semelhantes</h2>
        <p>Atualmente, a Coders Zoom não utiliza pixels de publicidade, ferramentas próprias de analytics ou cookies de marketing neste site. A infraestrutura de hospedagem pode utilizar dados técnicos e tecnologias estritamente necessárias para segurança, funcionamento e controle de acesso.</p>
        <p>Se ferramentas opcionais de medição ou publicidade forem adicionadas, esta Política será atualizada e, quando exigido, será solicitado consentimento antes da ativação.</p>
      </section>

      <section id="retencao">
        <h2>7. Por quanto tempo guardamos os dados</h2>
        <ul>
          <li><strong>Candidaturas não aprovadas ou não convertidas:</strong> até 6 meses após o envio.</li>
          <li><strong>Participantes contratados:</strong> durante a relação contratual e, depois, pelo período necessário ao cumprimento de obrigações legais, fiscais, contábeis e ao exercício regular de direitos.</li>
          <li><strong>Comunicações e registros de suporte:</strong> enquanto necessários ao atendimento e à defesa de direitos.</li>
          <li><strong>Registros técnicos:</strong> conforme os prazos de segurança e as obrigações aplicáveis à infraestrutura utilizada.</li>
        </ul>
        <p>Encerrada a finalidade e inexistindo obrigação de conservação, os dados serão eliminados ou anonimizados dentro dos limites técnicos razoáveis.</p>
      </section>

      <section id="direitos">
        <h2>8. Seus direitos</h2>
        <p>Nos termos da LGPD, o titular pode solicitar, quando aplicável:</p>
        <ul>
          <li>confirmação da existência de tratamento e acesso aos dados;</li>
          <li>correção de dados incompletos, inexatos ou desatualizados;</li>
          <li>anonimização, bloqueio ou eliminação de dados desnecessários ou tratados irregularmente;</li>
          <li>portabilidade, conforme regulamentação aplicável;</li>
          <li>informações sobre compartilhamentos;</li>
          <li>eliminação de dados tratados com consentimento e revogação do consentimento;</li>
          <li>oposição ao tratamento realizado em desconformidade com a lei;</li>
          <li>revisão de decisões tomadas unicamente com base em tratamento automatizado, caso existam.</li>
        </ul>
        <p>Para exercer direitos, envie uma solicitação para <a href={`mailto:${siteConfig.contact.privacyEmail}`}>{siteConfig.contact.privacyEmail}</a>. Poderemos pedir informações adicionais para confirmar a identidade do solicitante e proteger os dados contra acessos indevidos. O atendimento é gratuito.</p>
      </section>

      <section id="seguranca">
        <h2>9. Segurança e incidentes</h2>
        <p>Adotamos medidas técnicas e administrativas proporcionais ao contexto para prevenir acessos não autorizados, perda, alteração, divulgação ou destruição indevida de dados. Nenhum sistema é absolutamente invulnerável; caso ocorra incidente relevante, serão tomadas as medidas de contenção e comunicação exigidas pela legislação.</p>
      </section>

      <section id="criancas">
        <h2>10. Crianças e adolescentes</h2>
        <p>A mentoria e o formulário são destinados a pessoas com 18 anos ou mais. Não coletamos intencionalmente dados de crianças ou adolescentes por este site.</p>
      </section>

      <section id="alteracoes">
        <h2>11. Alterações desta Política</h2>
        <p>Esta Política pode ser atualizada para refletir mudanças no serviço, nos fornecedores ou na legislação. A versão vigente será publicada nesta página com a respectiva data de atualização. Mudanças relevantes serão destacadas quando necessário.</p>
      </section>
    </LegalPage>
  );
}
