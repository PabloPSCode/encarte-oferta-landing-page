import PaymentResultShell from "@/components/payment/PaymentResultShell";
import PaymentSuccess from "@/components/payment/PaymentSuccess";
import { getPlans } from "@/services/plans";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pagamento aprovado",
  description: "Confirmação do pagamento da assinatura do Encarte Oferta.",
  alternates: { canonical: "/pagamento-sucesso" },
  robots: { index: false, follow: false },
};

interface PaymentSuccessPageProps {
  searchParams: Promise<{ session_id?: string }>;
}

/** Para onde o Stripe Checkout volta com o pagamento aprovado (`?session_id=`). */
export default async function PaymentSuccessPage({ searchParams }: PaymentSuccessPageProps) {
  const [plans, { session_id: sessionId }] = await Promise.all([getPlans(), searchParams]);

  return (
    <PaymentResultShell eyebrow="Pagamento" title="Pagamento recebido">
      <PaymentSuccess sessionId={sessionId ?? null} plans={plans} />
    </PaymentResultShell>
  );
}
