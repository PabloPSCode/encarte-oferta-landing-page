import Link from "next/link";
import { EnvelopeSimple, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import Logo from "./Logo";
import { COMPANY, SITE, SUPPORT, whatsappLink } from "@/content/site";

const PRODUCT_LINKS = [
  { href: "/#recursos", label: "Recursos" },
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/#segmentos", label: "Segmentos" },
  { href: "/#planos", label: "Planos" },
  { href: "/#duvidas", label: "Dúvidas frequentes" },
];

const LEGAL_LINKS = [
  { href: "/termos-de-uso", label: "Termos de Uso" },
  { href: "/politica-de-privacidade", label: "Política de Privacidade" },
  { href: "/exclusao-de-dados", label: "Exclusão de dados" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 bg-on-brand text-white/80">
      <div className="h-1.5 bg-gradient-to-r from-accent via-accent-hot to-brand" />
      <div className="mx-auto grid max-w-[1200px] gap-12 px-4 py-14 sm:px-7 md:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Logo height={32} />
          <p className="mt-5 max-w-[300px] text-[13.5px] leading-relaxed text-white/60">
            Encartes de ofertas prontos em minutos, com vídeo narrado e publicação agendada no Instagram e no Facebook.
          </p>
        </div>

        <FooterColumn title="Produto" links={PRODUCT_LINKS} />
        <FooterColumn title="Legal" links={[...LEGAL_LINKS, { href: SITE.appUrl, label: "Acessar a plataforma" }]} />

        <div>
          <h2 className="text-[12px] font-extrabold uppercase tracking-[0.12em] text-brand">Suporte</h2>
          <ul className="mt-4 space-y-3.5 text-[13.5px]">
            <li>
              <a
                href={whatsappLink("Olá! Preciso de ajuda com o Encarte Oferta.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 font-bold text-white hover:text-brand"
              >
                <WhatsappLogo size={20} weight="fill" className="text-[#25D366]" />
                {SUPPORT.whatsappLabel}
              </a>
              <p className="mt-1 pl-[30px] text-[12px] text-white/50">{SUPPORT.whatsappHours}</p>
            </li>
            <li>
              <a href={`mailto:${SUPPORT.email}`} className="inline-flex items-center gap-2.5 font-bold text-white hover:text-brand">
                <EnvelopeSimple size={20} weight="bold" className="text-brand" />
                {SUPPORT.email}
              </a>
              <p className="mt-1 pl-[30px] text-[12px] text-white/50">{SUPPORT.emailHours}</p>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-2 px-4 py-6 text-[12px] text-white/50 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <p>
            © {year} {SITE.name}. Operado por {COMPANY.legalName}
            {COMPANY.cnpj && ` — CNPJ ${COMPANY.cnpj}`}.
          </p>
          <p>Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h2 className="text-[12px] font-extrabold uppercase tracking-[0.12em] text-brand">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-[13.5px] font-semibold text-white/75 transition-colors hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
