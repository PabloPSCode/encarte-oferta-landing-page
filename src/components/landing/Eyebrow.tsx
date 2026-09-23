import clsx from "clsx";

export default function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2 text-[11.5px] font-extrabold uppercase tracking-[0.12em] text-brand-ink",
        className
      )}
    >
      <span aria-hidden className="h-[3px] w-5 rounded-full bg-accent" />
      {children}
    </span>
  );
}
