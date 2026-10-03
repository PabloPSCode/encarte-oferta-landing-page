import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";
import { REFUND_POLICY, SITE, SUPPORT, formatBRL } from "@/content/site";
import { getPlans } from "@/services/plans";
import { planTitle, videoRefundChargeOf } from "@/utils/plans";

export const metadata: Metadata = {
  title: "Política de Cancelamento",
  description:
    "Como cancelar um plano do Encarte Oferta, a garantia de 7 dias e como o reembolso é calculado: valor pago menos os vídeos com IA gerados no período.",
  alternates: { canonical: REFUND_POLICY.href },
};

const Email = () => <a href={`mailto:${SUPPORT.email}`}>{SUPPORT.email}</a>;

export default async function CancellationPolicyPage() {
  const plans = await getPlans();
  const charge = videoRefundChargeOf(plans);
  const days = REFUND_POLICY.days;

  // Exemplo com o plano pago mais barato, para a conta ficar concreta.
  const example = plans.find((plan) => plan.monthValueInCents > 0);
  const exampleVideos = 3;

  const sections: LegalSection[] = [
    {
      id: "resumo",
      title: "Resumo",
      content: (
        <ul>
          <li>
            Você pode cancelar o seu plano a qualquer momento, sem multa.
          </li>
          <li>
            <strong>Cancelou em até {days} dias da contratação?</strong> O reembolso é processado automaticamente:
            devolvemos o valor pago, descontando <strong>{formatBRL(charge)} por vídeo com IA</strong> gerado nesse
            período.
          </li>
          <li>
            <strong>Cancelou depois dos {days} dias?</strong> Não há reembolso, e o acesso continua até o fim do ciclo
            de cobrança já pago.
          </li>
        </ul>
      ),
    },
    {
      id: "garantia",
      title: `Garantia de ${days} dias`,
      content: (
        <>
          <p>
            Todo plano pago contratado no cadastro da empresa tem {days} dias corridos de garantia, contados a partir da
            contratação. Durante esse período você usa todos os recursos e toda a cota do plano, sem limitação.
          </p>
          <p>
            Se cancelar dentro desse prazo, o reembolso é processado automaticamente, sem necessidade de justificativa,
            no mesmo meio de pagamento usado na contratação. No cartão de crédito, o estorno pode levar até duas faturas
            para aparecer, conforme o emissor do cartão.
          </p>
          <p>O plano gratuito não tem cobrança e, por isso, não tem reembolso.</p>
        </>
      ),
    },
    {
      id: "calculo",
      title: "Como o reembolso é calculado",
      content: (
        <>
          <p>
            O único item descontado é o <strong>vídeo com IA</strong>, porque cada vídeo tem um custo real de produção
            (narração e renderização) no momento em que é gerado:
          </p>
          <p>
            <strong>Reembolso = valor pago − (vídeos com IA gerados no período × {formatBRL(charge)})</strong>
          </p>
          <ul>
            <li>Vale para o valor efetivamente pago, seja no pagamento mensal ou no anual.</li>
            <li>Encartes, temas com IA e produtos personalizados não são descontados.</li>
            <li>
              Um vídeo cuja geração falhou não é descontado, já que o crédito volta automaticamente para você. Um vídeo
              gerado e depois excluído continua sendo descontado.
            </li>
            <li>O reembolso nunca é negativo: você não paga nada além do que já pagou.</li>
          </ul>
          {example && (
            <p>
              <strong>Exemplo:</strong> plano {planTitle(example)} mensal, {formatBRL(example.monthValueInCents)}, com{" "}
              {exampleVideos} vídeos gerados nos primeiros dias: {formatBRL(example.monthValueInCents)} − {exampleVideos}{" "}
              × {formatBRL(charge)} = <strong>{formatBRL(example.monthValueInCents - exampleVideos * charge)}</strong>{" "}
              devolvidos.
            </p>
          )}
        </>
      ),
    },
    {
      id: "apos-garantia",
      title: `Cancelamento depois dos ${days} dias`,
      content: (
        <ul>
          <li>Não há reembolso, nem proporcional, do ciclo já pago, seja mensal ou anual.</li>
          <li>O acesso continua normalmente até o fim do ciclo de cobrança já pago.</li>
          <li>Não há multa nem cobrança adicional, e nenhuma nova cobrança é feita depois do cancelamento.</li>
        </ul>
      ),
    },
    {
      id: "como-cancelar",
      title: "Como cancelar",
      content: (
        <>
          <p>
            Peça o cancelamento pelo WhatsApp {SUPPORT.whatsappLabel} ({SUPPORT.whatsappHours.toLowerCase()}) ou pelo
            e-mail <Email />, informando o CNPJ da empresa. Vale a data em que o pedido de cancelamento for recebido.
          </p>
          <p>
            Antes de cancelar, recomendamos baixar os encartes e vídeos que quiser guardar. Depois do encerramento, você
            pode pedir a exportação ou a eliminação dos seus dados, conforme a{" "}
            <Link href="/politica-de-privacidade">Política de Privacidade</Link>.
          </p>
        </>
      ),
    },
    {
      id: "direitos",
      title: "Seus direitos",
      content: (
        <p>
          Esta política complementa os <Link href="/termos-de-uso">Termos de Uso</Link> e não limita direitos garantidos
          por lei, como o direito de arrependimento previsto no art. 49 do Código de Defesa do Consumidor, quando
          aplicável.
        </p>
      ),
    },
  ];

  return (
    <LegalPage
      eyebrow="Documento legal"
      title="Política de Cancelamento"
      updatedAt={REFUND_POLICY.updatedAt}
      related={{ href: "/termos-de-uso", label: "Termos de Uso" }}
      intro={
        <p>
          Esta política explica como cancelar um plano do {SITE.name}, como funciona a garantia de {days} dias e como o
          valor do reembolso é calculado.
        </p>
      }
      sections={sections}
    />
  );
}
