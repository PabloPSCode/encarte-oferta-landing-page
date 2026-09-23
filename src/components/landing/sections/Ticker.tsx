const ITEMS = [
  "Instagram Feed",
  "Instagram Stories",
  "Reels",
  "Facebook Feed",
  "Facebook Stories",
  "Envio pelo WhatsApp",
  "Vídeo narrado",
  "PNG em alta resolução",
  "Preço de / por",
  "Parcelamento",
];

export default function Ticker() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="overflow-hidden border-y-4 border-accent bg-accent py-3.5" aria-label="Canais e formatos suportados">
      <ul className="flex w-max animate-marquee gap-8 whitespace-nowrap">
        {row.map((item, i) => (
          <li key={i} aria-hidden={i >= ITEMS.length} className="flex items-center gap-8 text-[14px] font-extrabold uppercase tracking-[0.06em] text-white">
            {item}
            <span className="text-brand">✦</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
