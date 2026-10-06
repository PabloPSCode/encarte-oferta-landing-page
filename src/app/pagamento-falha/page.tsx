import PaymentFailure from "@/components/payment/PaymentFailure";
import PaymentResultShell from "@/components/payment/PaymentResultShell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pagamento não concluído",
  description: "O pagamento da assinatura do Encarte Oferta não foi concluído.",
  alternates: { canonical: "/pagamento-falha" },
  robots: { index: false, follow: false },
};

/** Para onde o Stripe Checkout volta quando o pagamento é cancelado ou recusado. */
export default function PaymentFailurePage() {
  return (
    <PaymentResultShell eyebrow="Pagamento" title="Pagamento não concluído">
      <PaymentFailure />
    </PaymentResultShell>
  );
}
