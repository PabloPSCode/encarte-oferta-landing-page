import { Check } from "@phosphor-icons/react/dist/ssr";

const DETAILS = [
  "Prévia em tempo real, com zoom de 50% a 150% enquanto você edita.",
  "Quatro formatos de preço normal e quatro de preço promocional “de / por”, com parcelamento.",
  "De 1 a 12 produtos por página e até 12 páginas no mesmo encarte.",
  "Validade da oferta impressa na arte: por período, para um dia ou até uma data.",
  "Pix, Visa, Mastercard, VR e Sodexo exibidos no rodapé como formas de pagamento.",
  "Encartes salvos: edite, baixe de novo ou gere o vídeo quando quiser.",
  "Equipe na mesma conta: um administrador cria os usuários da loja.",
  "Funciona no computador, no tablet e no celular, sem instalar nada.",
];

export default function Details() {
  return (
    <section className="relative mt-28 overflow-hidden bg-on-brand">
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

          {/* etiqueta de preço no estilo dos encartes */}
          <div aria-hidden className="mt-10 inline-flex -rotate-3 items-stretch overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
            <div className="flex flex-col justify-center bg-accent px-4 py-3 text-white">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.14em]">De</span>
              <span className="text-[16px] font-bold line-through decoration-2">R$ 8,99</span>
            </div>
            <div className="flex items-start gap-1 bg-brand px-5 py-3 text-on-brand">
              <span className="mt-2 text-[14px] font-black">R$</span>
              <span className="text-[54px] font-black leading-none tracking-[-0.04em]">6</span>
              <span className="mt-1.5 flex flex-col leading-none">
                <span className="text-[24px] font-black">,89</span>
                <span className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.1em]">unid</span>
              </span>
            </div>
          </div>
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
