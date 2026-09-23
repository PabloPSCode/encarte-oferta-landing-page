import { Check } from "@phosphor-icons/react/dist/ssr";

const DETAILS = [
  "Ajuste de design da arte com diversas opções de personalização.",
  "Possibilidade de exibir preços promocionais “de / por” e com parcelamento.",
  "De 1 a 12 produtos por página e até 12 páginas no mesmo encarte.",
  "Validade da oferta impressa na arte: por período, para um dia ou até uma data.",
  "Pix, Visa, Mastercard, VR e Sodexo exibidos no rodapé como formas de pagamento.",
  "Encartes salvos: edite, baixe de novo ou gere o vídeo quando quiser.",
  "Equipe na mesma conta: um administrador cria os usuários da loja.",
  "Funciona no computador, no tablet e no celular, sem instalar nada.",
];

export default function Details() {
  return (
    <section className="relative mt-28 overflow-hidden bg-accent">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(#FFC814_1.2px,transparent_1.3px)] [background-size:20px_20px]"
      />
      <div className="relative mx-auto grid max-w-[1200px] items-center gap-14 px-4 py-20 sm:px-7 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="text-[32px] font-black leading-[1.1] tracking-[-0.03em] text-white text-balance sm:text-[40px]">
            Menos retrabalho, <span className="text-brand">mais oferta no ar</span>
          </h2>
          <p className="mt-4 max-w-[460px] text-[16px] leading-relaxed text-white/65 text-pretty">
            Cada detalhe foi pensado para quem publica ofertas toda semana e não pode perder tempo ajustando arte.
          </p>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2">
          {DETAILS.map((d) => (
            <li key={d} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand text-on-brand">
                <Check size={14} weight="bold" />
              </span>
              <span className="text-[14px] leading-relaxed text-white/85">{d}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
