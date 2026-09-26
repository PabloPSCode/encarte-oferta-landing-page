"use client";

import { ArrowRight, CircleNotch, WarningOctagon, type Icon } from "@phosphor-icons/react";

interface FormSectionProps {
  icon: Icon;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function FormSection({ icon: SectionIcon, title, description, children }: FormSectionProps) {
  return (
    <section className="flex flex-col gap-5 border-t border-line pt-7 first:border-t-0 first:pt-0">
      <div className="flex gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-[12px] bg-brand-tint text-brand-ink">
          <SectionIcon size={20} weight="bold" />
        </span>
        <div>
          <h3 className="text-[17px] font-black tracking-[-0.01em] text-ink">{title}</h3>
          {description && <p className="mt-0.5 text-[13.5px] leading-relaxed text-ink-2">{description}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

export function FormAlert({ children }: { children: React.ReactNode }) {
  return (
    <div role="alert" className="flex gap-3 rounded-[14px] border border-accent/25 bg-accent-tint p-4 text-[14px] font-semibold text-accent-strong">
      <WarningOctagon size={20} weight="fill" className="mt-px shrink-0" />
      <p>{children}</p>
    </div>
  );
}

interface SubmitButtonProps {
  loading: boolean;
  loadingLabel: string;
  children: React.ReactNode;
}

export function SubmitButton({ loading, loadingLabel, children }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="group inline-flex w-full items-center justify-center gap-2.5 rounded-[13px] bg-accent px-7 py-4 text-[15px] font-extrabold text-white transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/40 active:scale-[0.98] disabled:cursor-wait disabled:opacity-80"
    >
      {loading ? (
        <>
          <CircleNotch size={18} weight="bold" className="animate-spin" />
          {loadingLabel}
        </>
      ) : (
        <>
          {children}
          <ArrowRight weight="bold" className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
        </>
      )}
    </button>
  );
}
