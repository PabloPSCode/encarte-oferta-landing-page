import {
  Barbell,
  Carrot,
  DeviceMobile,
  Drop,
  HardHat,
  Knife,
  PawPrint,
  ShieldCheck,
  ShoppingCart,
  Tire,
} from "@phosphor-icons/react/dist/ssr";
import Eyebrow from "../Eyebrow";
import { SEGMENTS } from "@/content/site";

const ICONS = { Barbell, Carrot, DeviceMobile, Drop, HardHat, Knife, PawPrint, ShieldCheck, ShoppingCart, Tire };

export default function Segments() {
  return (
    <section id="segmentos" className="mx-auto max-w-[1200px] px-4 pt-28 sm:px-7">
      <div className="max-w-[680px]">
        <Eyebrow>Segmentos</Eyebrow>
        <h2 className="mt-3 text-[32px] font-black leading-[1.1] tracking-[-0.03em] text-ink text-balance sm:text-[40px]">
          Temas e produtos pensados para o seu segmento
        </h2>
        <p className="mt-4 text-[16px] leading-relaxed text-ink-2 text-pretty">
          No cadastro você informa o segmento da loja, e as categorias de produtos e os temas se ajustam ao que você vende.
          Ramos maiores já incluem outros: um supermercado também tem categorias de açougue, hortifrúti e pet.
        </p>
      </div>
      <ul className="mt-10 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {SEGMENTS.map((s) => {
          const Icon = ICONS[s.icon]
          return (
            <li
              key={s.label}
              className="flex items-center gap-3 rounded-[14px] border border-line bg-surface px-4 py-3.5 transition-colors hover:border-accent hover:bg-accent-tint"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-[11px] bg-accent text-white">
                <Icon size={20} weight="bold" />
              </span>
              <span className="text-[13.5px] font-bold leading-tight text-ink-2">{s.label}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
