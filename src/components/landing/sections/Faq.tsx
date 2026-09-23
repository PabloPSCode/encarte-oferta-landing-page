import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import Eyebrow from "../Eyebrow";
import { FAQ, SUPPORT, whatsappLink } from "@/content/site";

export default function Faq() {
  return (
    <section id="duvidas" className="mx-auto max-w-[1200px] px-4 pt-28 sm:px-7">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Eyebrow>Dúvidas frequentes</Eyebrow>
          <h2 className="mt-3 text-[32px] font-black leading-[1.1] tracking-[-0.03em] text-ink text-balance sm:text-[40px]">
            Perguntas que os lojistas fazem
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-ink-2 text-pretty">
            Não encontrou o que procurava? Fale com o suporte pelo{" "}
            <a
              href={whatsappLink("Olá! Tenho uma dúvida sobre o Encarte Oferta.")}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-accent underline-offset-2 hover:underline"
            >
              WhatsApp
            </a>{" "}
            ou pelo e-mail{" "}
            <a href={`mailto:${SUPPORT.email}`} className="font-bold text-accent underline-offset-2 hover:underline">
              {SUPPORT.email}
            </a>
            .
          </p>
        </div>
        <div className="divide-y divide-line overflow-hidden rounded-[20px] border border-line bg-surface">
          {FAQ.map((item) => (
            <details key={item.q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-[15px] font-extrabold text-ink transition-colors hover:bg-surface-2 [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-tint text-brand-ink transition-transform duration-200 group-open:rotate-180 group-open:bg-brand group-open:text-on-brand">
                  <CaretDown size={16} weight="bold" />
                </span>
              </summary>
              <p className="px-6 pb-6 text-[14px] leading-relaxed text-ink-2 text-pretty">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
