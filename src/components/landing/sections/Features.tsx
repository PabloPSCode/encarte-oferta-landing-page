import {
  Eraser,
  FilmSlate,
  CalendarCheck,
  MagicWand,
  Package,
  Storefront,
} from "@phosphor-icons/react/dist/ssr";
import Eyebrow from "../Eyebrow";

const FEATURES = [
  {
    icon: MagicWand,
    title: "Temas prontos e gerados com IA",
    body: "Mais de 300 temas organizados por ramo e data comemorativa. Utilize-os diretamente ou gere seu próprio tema com IA.",
  },
  {
    icon: Package,
    title: "Catálogo com +40 mil produtos",
    body: "Produtos com foto, EAN e unidade de venda prontos para usar. Cadastre também itens próprios, como cortes da casa, a granel e caseiros.",
  },
  {
    icon: Eraser,
    title: "Fundo removido automaticamente",
    body: "Envie a foto do seu produto em PNG, JPEG ou WEBP e ela entra no encarte sem fundo, combinando com qualquer tema.",
  },
  {
    icon: FilmSlate,
    title: "Vídeo narrado para Reels e Stories",
    body: "Transforme o encarte em vídeo com produtos e preços animados, narração em português e trilha sonora em sete estilos.",
  },
  {
    icon: CalendarCheck,
    title: "Agendamento no Instagram e Facebook",
    body: "Conecte suas contas e programe a publicação no feed, nos stories ou nos reels, com data, hora e fuso horário.",
  },
  {
    icon: Storefront,
    title: "A identidade da sua loja",
    body: "Logo, slogan, cores, telefone, WhatsApp, endereço, redes sociais e formas de pagamento aplicados no rodapé de cada arte.",
  },
];

export default function Features() {
  return (
    <section id="recursos" className="mx-auto max-w-[1200px] px-4 pt-24 sm:px-7">
      <div className="max-w-[680px]">
        <Eyebrow>Recursos</Eyebrow>
        <h2 className="mt-3 text-[32px] font-black leading-[1.1] tracking-[-0.03em] text-ink text-balance sm:text-[40px]">
          Tudo que o seu encarte precisa, num só lugar
        </h2>
        <p className="mt-4 text-[16px] leading-relaxed text-ink-2 text-pretty">
          Do catálogo de produtos à publicação nas redes, a plataforma cuida das etapas que costumam atrasar a sua oferta.
        </p>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map(({ icon: Icon, title, body }, i) => (
          <article
            key={title}
            className="group relative overflow-hidden rounded-[20px] border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-[0_18px_40px_rgba(224,166,0,0.18)]"
          >
            <span className="absolute right-5 top-4 text-[44px] font-black leading-none text-surface-2 transition-colors group-hover:text-brand-tint">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="relative grid size-12 place-items-center rounded-[14px] bg-brand-tint text-brand-ink transition-colors group-hover:bg-brand group-hover:text-on-brand">
              <Icon size={24} weight="bold" />
            </span>
            <h3 className="relative mt-5 text-[17.5px] font-extrabold tracking-[-0.01em] text-ink">{title}</h3>
            <p className="relative mt-2 text-[14px] leading-relaxed text-ink-2 text-pretty">{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
