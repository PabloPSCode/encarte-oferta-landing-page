import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import RegistrationFlow from "@/components/registration/RegistrationFlow";
import { getPlans } from "@/services/plans";
import {
  ArrowLeftIcon,
  BuildingsIcon,
  ShieldCheckIcon,
  SparkleIcon,
  UserCircleIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cadastro",
  description:
    "Cadastre a sua empresa no Encarte Oferta em dois passos: dados da empresa e acesso do administrador. Em poucos minutos você já cria o seu primeiro encarte.",
  alternates: { canonical: "/cadastro" },
};

const HOW_IT_WORKS = [
  {
    icon: BuildingsIcon,
    title: "1. Dados da empresa",
    body: "Escolha o plano, o ramo de atividade e informe os dados do cartão CNPJ, o contato e o endereço da loja.",
  },
  {
    icon: UserCircleIcon,
    title: "2. Administrador",
    body: "Crie o seu acesso com e-mail e senha. O administrador gerencia a conta e cadastra os usuários da equipe.",
  },
  {
    icon: SparkleIcon,
    title: "Pronto para criar",
    body: "Entre no app, configure logo, cores e contatos do encarte e publique as suas ofertas.",
  },
];

interface CadastroPageProps {
  searchParams: Promise<{ plano?: string }>;
}

export default async function CadastroPage({
  searchParams,
}: CadastroPageProps) {
  const [plans, { plano }] = await Promise.all([getPlans(), searchParams]);
  const defaultPlanId = plans.find((p) => p.name === plano?.toLowerCase())?.id;

  return (
    <div className="overflow-x-clip font-sans">
      <Header />
      <main className="bg-background pb-24">
        <section className="relative overflow-hidden bg-gradient-to-br from-brand to-brand-strong">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:radial-gradient(#1A1400_1.2px,transparent_1.3px)] [background-size:18px_18px] [mask-image:linear-gradient(115deg,transparent_40%,black_90%)]"
          />
          <div className="relative mx-auto max-w-[1200px] px-4 pb-14 pt-10 sm:px-7 sm:pb-16">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[13px] font-bold text-on-brand-soft hover:text-on-brand"
            >
              <ArrowLeftIcon size={16} weight="bold" /> Voltar para a página
              inicial
            </Link>
            <p className="mt-8 text-[11.5px] font-extrabold uppercase tracking-[0.12em] text-brand-ink">
              Cadastro
            </p>
            <h1 className="mt-2 max-w-[720px] text-[36px] font-black leading-[1.05] tracking-[-0.035em] text-on-brand text-balance sm:text-[52px]">
              Comece a criar os encartes da sua loja
            </h1>
            <p className="mt-4 max-w-[600px] text-[16px] leading-relaxed text-on-brand-soft text-pretty">
              São só dois passos: primeiro os dados da sua empresa, depois o seu
              acesso de administrador. Se precisar parar no meio, tudo bem: ao
              voltar por este navegador, você continua de onde parou.
            </p>
          </div>
        </section>

        <div className="mx-auto grid max-w-[1200px] gap-10 px-4 pt-10 sm:px-7 lg:grid-cols-[1fr_320px]">
          <div className="min-w-0">
            <RegistrationFlow plans={plans} defaultPlanId={defaultPlanId} />
          </div>

          <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[18px] border border-line bg-surface p-5">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-ink-soft">
                Como funciona
              </p>
              <ul className="mt-4 flex flex-col gap-4">
                {HOW_IT_WORKS.map(({ icon: ItemIcon, title, body }) => (
                  <li key={title} className="flex gap-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-brand-tint text-brand-ink">
                      <ItemIcon size={18} weight="bold" />
                    </span>
                    <div>
                      <p className="text-[14px] font-extrabold text-ink">
                        {title}
                      </p>
                      <p className="mt-0.5 text-[13px] leading-relaxed text-ink-2">
                        {body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3 rounded-[18px] bg-accent-tint p-5">
              <ShieldCheckIcon
                size={22}
                weight="fill"
                className="shrink-0 text-accent"
              />
              <p className="text-[13px] leading-relaxed text-ink-2">
                <strong className="text-ink">
                  Seus dados estão protegidos.
                </strong>{" "}
                Conferimos o CNPJ na Receita Federal e usamos as informações só
                para operar a sua conta. Saiba mais na{" "}
                <Link
                  href="/politica-de-privacidade"
                  className="font-bold text-accent hover:underline"
                >
                  Política de Privacidade
                </Link>
                .
              </p>
            </div>

            <p className="px-1 text-[12.5px] leading-relaxed text-ink-soft">
              Ao concluir o cadastro, você concorda com os{" "}
              <Link
                href="/termos-de-uso"
                className="font-bold text-ink-2 hover:underline"
              >
                Termos de Uso
              </Link>{" "}
              do Encarte Oferta.
            </p>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
