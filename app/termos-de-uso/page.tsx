import type { Metadata } from "next";
import { LegalPage } from "../components/LegalPage";
import { companyConfig, siteConfig } from "../../content/site";

export const metadata: Metadata = {
  title: "Termos de Uso e da Mentoria | Coders Zoom",
  description: "Condições de acesso ao site e contratação da Mentoria Tech que Vira Negócio.",
  alternates: { canonical: "/termos-de-uso" },
};

export default function TermsOfUse() {
  return (
    <LegalPage
      eyebrow="Condições de uso e contratação"
      title="Termos de Uso e da Mentoria"
      summary="Estas condições organizam o uso do site, o processo de candidatura e a prestação da Mentoria Tech que Vira Negócio."
      updatedAt="12 de agosto de 2026"
    >
      <section>
        <h2>1. Identificação e aceitação</h2>
        <p>O site e a Mentoria Tech que Vira Negócio são oferecidos por <strong>{companyConfig.legalName}</strong>, CNPJ nº <strong>{companyConfig.cnpj}</strong>, com endereço em {companyConfig.address}, responsável pela marca Coders Zoom.</p>
        <p>Ao utilizar o site ou enviar uma candidatura, você declara ter lido estes Termos e a <a href={siteConfig.links.privacyPolicy}>Política de Privacidade</a>. A candidatura não cria obrigação de contratação para nenhuma das partes.</p>
      </section>

      <section>
        <h2>2. Finalidade do site</h2>
        <p>O site apresenta uma mentoria individual de tecnologia e negócios e permite que interessados se candidatem. O conteúdo possui caráter informativo e não constitui proposta irrevogável, garantia de vaga, aconselhamento jurídico, contábil ou financeiro.</p>
      </section>

      <section>
        <h2>3. Processo de candidatura</h2>
        <p>O candidato deve fornecer informações verdadeiras, atuais e próprias. As respostas serão analisadas para verificar compatibilidade entre o momento do candidato e a proposta da mentoria. A Coders Zoom poderá aprovar, recusar ou solicitar informações adicionais, sem obrigação de justificar decisões estratégicas, respeitada a legislação aplicável.</p>
        <p>Valores, condições de pagamento, disponibilidade e data de início serão apresentados antes da contratação. Nenhum pagamento será exigido apenas para o envio da candidatura.</p>
      </section>

      <section>
        <h2>4. Estrutura da mentoria</h2>
        <p>A Mentoria Tech que Vira Negócio possui duração prevista de oito semanas e inclui:</p>
        <ul>
          <li>diagnóstico estratégico inicial;</li>
          <li>seis encontros individuais por Google Meet;</li>
          <li>encontros com duração aproximada de 1h15 a 1h30;</li>
          <li>atividades práticas entre os encontros;</li>
          <li>suporte assíncrono por WhatsApp, de natureza não imediata e sujeito à disponibilidade razoável do mentor;</li>
          <li>plano de execução para os 90 dias seguintes.</li>
        </ul>
        <p>Datas, horários e eventuais detalhes adicionais constarão da proposta ou instrumento de contratação. Em caso de divergência, o documento comercial específico prevalecerá sobre descrições gerais do site.</p>
      </section>

      <section>
        <h2>5. Agendamento, reagendamento e faltas</h2>
        <p>O reagendamento é permitido mediante aviso com antecedência mínima de 24 horas e ficará sujeito à disponibilidade de agenda do mentor.</p>
        <p>Em caso de impossibilidade de comparecimento, o participante deverá comunicar a Coders Zoom com a mesma antecedência. Pedidos feitos com menos de 24 horas serão analisados conforme o contexto e a disponibilidade, sem garantia de reposição, ressalvadas situações justificadas e direitos assegurados por lei.</p>
        <p>Se a Coders Zoom precisar alterar um encontro, será oferecida nova data sem prejuízo ao participante.</p>
      </section>

      <section>
        <h2>6. Responsabilidades do participante</h2>
        <p>O participante se compromete a:</p>
        <ul>
          <li>comparecer aos encontros e executar as atividades acordadas;</li>
          <li>manter meios técnicos adequados para participar das chamadas;</li>
          <li>fornecer informações honestas e tomar suas próprias decisões de negócio;</li>
          <li>respeitar a confidencialidade, a propriedade intelectual e os canais de contato;</li>
          <li>não compartilhar acesso, materiais ou conteúdos da mentoria com terceiros.</li>
        </ul>
      </section>

      <section>
        <h2>7. Ausência de garantia de resultados</h2>
        <p>A mentoria oferece orientação, método, análise e acompanhamento. Não existe garantia de faturamento, lucro, investimento, aquisição de clientes, crescimento, venda da empresa ou qualquer resultado específico. Os resultados dependem, entre outros fatores, do contexto, do mercado, das decisões e da execução do participante.</p>
        <p>O mentor não substitui profissionais jurídicos, contábeis, financeiros ou de outras áreas reguladas. O participante permanece responsável por validar e executar suas decisões.</p>
      </section>

      <section>
        <h2>8. Pagamento e contratação</h2>
        <p>O investimento, as formas de pagamento e as datas de vencimento serão informados ao candidato aprovado antes da aceitação. A contratação será concluída somente após concordância com a proposta e confirmação do pagamento ou da condição estabelecida.</p>
        <p>Tributos, emissão de documento fiscal, atrasos e eventuais encargos seguirão a proposta, a legislação aplicável e as condições apresentadas antes da compra.</p>
      </section>

      <section>
        <h2>9. Direito de arrependimento e cancelamento</h2>
        <p>Quando a contratação ocorrer online ou fora do estabelecimento comercial, o consumidor poderá exercer o direito de arrependimento no prazo legal de 7 dias contados da contratação, com devolução dos valores pagos, nos termos do Código de Defesa do Consumidor.</p>
        <p>Após esse prazo, o participante ainda poderá solicitar o cancelamento pelo e-mail <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>. O acerto financeiro será calculado de forma proporcional: serão preservados os valores correspondentes aos encontros, diagnósticos, materiais e demais serviços já efetivamente disponibilizados ou prestados, e será devolvido eventual saldo referente à parte não executada, observadas as condições específicas informadas antes da contratação e a legislação aplicável.</p>
        <p>O pedido será confirmado pelo mesmo canal de atendimento. Nada nesta cláusula limita direitos obrigatórios do consumidor.</p>
      </section>

      <section>
        <h2>10. Vaga pessoal e intransferível</h2>
        <p>A vaga é individual, pessoal e intransferível. O participante não poderá ceder, revender ou transferir a mentoria a outra pessoa sem autorização expressa e escrita da Coders Zoom.</p>
      </section>

      <section>
        <h2>11. Gravações, confidencialidade e imagem</h2>
        <p>Os encontros não serão gravados pela Coders Zoom. O participante também não poderá gravar, transcrever, reproduzir ou transmitir os encontros sem autorização prévia e escrita de todos os envolvidos.</p>
        <p>As partes deverão tratar com confidencialidade informações estratégicas, técnicas, comerciais ou pessoais compartilhadas durante a mentoria. Essa obrigação não alcança informações públicas, obtidas legitimamente de terceiros ou cuja divulgação seja exigida por lei.</p>
        <p>Nome, imagem, empresa, depoimento ou resultado do participante somente poderão ser divulgados com autorização específica.</p>
      </section>

      <section>
        <h2>12. Propriedade intelectual</h2>
        <p>Textos, métodos, apresentações, planilhas, modelos e demais materiais fornecidos são protegidos pela legislação de propriedade intelectual. A contratação concede ao participante licença pessoal, limitada, não exclusiva e intransferível para uso próprio durante e após a mentoria.</p>
        <p>É proibido copiar, vender, sublicenciar, publicar, disponibilizar ou utilizar os materiais para oferecer produto ou serviço concorrente sem autorização escrita. A mentoria não transfere à Coders Zoom a titularidade sobre produtos, códigos ou ativos preexistentes do participante.</p>
      </section>

      <section>
        <h2>13. Plataformas de terceiros</h2>
        <p>Encontros e comunicações podem depender de Google Meet, WhatsApp, serviços de e-mail, hospedagem e pagamento. A disponibilidade e o tratamento de dados nesses ambientes também se submetem aos termos e políticas dos respectivos fornecedores. A Coders Zoom buscará alternativas razoáveis quando uma indisponibilidade relevante impedir a prestação do serviço.</p>
      </section>

      <section>
        <h2>14. Uso adequado do site</h2>
        <p>É proibido tentar acessar áreas restritas, interferir no funcionamento do site, disseminar códigos maliciosos, automatizar envios abusivos, usar identidade falsa ou violar direitos de terceiros. Conteúdos e links do site não podem ser reutilizados de forma enganosa ou para sugerir parceria não autorizada.</p>
      </section>

      <section>
        <h2>15. Privacidade</h2>
        <p>O tratamento de dados pessoais relacionado ao site, à candidatura e à mentoria é descrito na <a href={siteConfig.links.privacyPolicy}>Política de Privacidade</a>, que integra estes Termos.</p>
      </section>

      <section>
        <h2>16. Alterações</h2>
        <p>Estes Termos podem ser atualizados para refletir mudanças legais ou operacionais. Alterações não reduzirão retroativamente direitos de contratos já celebrados. A versão aplicável à contratação será aquela apresentada ao participante na data da aceitação, salvo atualização legal obrigatória.</p>
      </section>

      <section>
        <h2>17. Lei aplicável e foro</h2>
        <p>Aplica-se a legislação brasileira. Fica indicado o foro de {companyConfig.jurisdiction} para questões decorrentes destes Termos, sem prejuízo do direito do consumidor de utilizar o foro de seu domicílio quando a legislação assim permitir.</p>
      </section>

      <section>
        <h2>18. Contato</h2>
        <p>Dúvidas, pedidos de cancelamento e outras solicitações podem ser enviados para <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>.</p>
      </section>
    </LegalPage>
  );
}
