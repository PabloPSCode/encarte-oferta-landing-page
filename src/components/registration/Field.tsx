"use client";

import { Eye, EyeSlash, WarningCircle } from "@phosphor-icons/react";
import clsx from "clsx";
import { forwardRef, useState, type InputHTMLAttributes, type SelectHTMLAttributes } from "react";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
  type RegisterOptions,
} from "react-hook-form";
import { IMaskInput } from "react-imask";

export const inputClass = (invalid: boolean) =>
  clsx(
    "h-12 w-full rounded-[12px] border-[1.5px] bg-surface px-4 text-[15px] font-medium text-ink outline-none transition",
    "placeholder:text-ink-soft/70 focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60",
    invalid
      ? "border-accent focus:border-accent focus:ring-accent/15"
      : "border-line focus:border-brand-strong focus:ring-brand/25"
  );

interface FieldProps {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  className?: string;
  children: React.ReactNode;
}

/** Rótulo, dica e mensagem de erro de um campo. O erro substitui a dica. */
export function Field({ id, label, hint, error, className, children }: FieldProps) {
  return (
    <div className={clsx("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-[13px] font-extrabold text-ink">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="flex items-start gap-1.5 text-[12.5px] font-semibold text-accent">
          <WarningCircle size={15} weight="fill" className="mt-px shrink-0" />
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-[12.5px] leading-snug text-ink-soft">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

const describedBy = (id: string, error?: string, hint?: string) =>
  error ? `${id}-error` : hint ? `${id}-hint` : undefined;

type TextFieldProps = Omit<FieldProps, "children"> & InputHTMLAttributes<HTMLInputElement>;

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ id, label, hint, error, className, ...rest }, ref) => (
    <Field id={id} label={label} hint={hint} error={error} className={className}>
      <input
        id={id}
        ref={ref}
        aria-invalid={!!error || undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={inputClass(!!error)}
        {...rest}
      />
    </Field>
  )
);
TextField.displayName = "TextField";

export const PasswordField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ id, label, hint, error, className, ...rest }, ref) => {
    const [visible, setVisible] = useState(false);
    return (
      <Field id={id} label={label} hint={hint} error={error} className={className}>
        <div className="relative">
          <input
            id={id}
            ref={ref}
            type={visible ? "text" : "password"}
            aria-invalid={!!error || undefined}
            aria-describedby={describedBy(id, error, hint)}
            className={clsx(inputClass(!!error), "pr-12")}
            {...rest}
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
            className="absolute inset-y-0 right-0 grid w-12 place-items-center text-ink-soft hover:text-ink"
          >
            {visible ? <EyeSlash size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </Field>
    );
  }
);
PasswordField.displayName = "PasswordField";

type SelectFieldProps = Omit<FieldProps, "children"> &
  SelectHTMLAttributes<HTMLSelectElement> & {
    placeholder: string;
    options: readonly { value: string; label: string }[];
  };

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ id, label, hint, error, className, placeholder, options, ...rest }, ref) => (
    <Field id={id} label={label} hint={hint} error={error} className={className}>
      <select
        id={id}
        ref={ref}
        aria-invalid={!!error || undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={clsx(inputClass(!!error), "appearance-none bg-[length:18px] bg-[right_14px_center] bg-no-repeat pr-10")}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'%3E%3Cpath fill='%237C8294' d='M213.7 101.7l-80 80a8 8 0 0 1-11.4 0l-80-80a8 8 0 0 1 11.4-11.4L128 164.7l74.3-74.4a8 8 0 0 1 11.4 11.4z'/%3E%3C/svg%3E\")",
        }}
        {...rest}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </Field>
  )
);
SelectField.displayName = "SelectField";

interface MaskedFieldProps<T extends FieldValues> extends Omit<FieldProps, "children"> {
  control: Control<T>;
  name: FieldPath<T>;
  rules?: Omit<RegisterOptions<T, FieldPath<T>>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled">;
  mask: string | { mask: string }[];
  placeholder?: string;
  inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
}

/** Campo com máscara (react-imask) ligado ao react-hook-form. O valor fica mascarado no formulário. */
export function MaskedField<T extends FieldValues>({
  control,
  name,
  rules,
  mask,
  id,
  label,
  hint,
  error,
  className,
  placeholder,
  inputMode = "numeric",
  autoComplete,
}: MaskedFieldProps<T>) {
  return (
    <Field id={id} label={label} hint={hint} error={error} className={className}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field }) => (
          <IMaskInput
            // Uma lista de máscaras (telefone fixo e celular) é escolhida pelo IMask conforme a digitação.
            mask={mask as never}
            id={id}
            inputRef={field.ref}
            name={field.name}
            value={field.value ?? ""}
            onAccept={(value: string) => field.onChange(value)}
            onBlur={field.onBlur}
            placeholder={placeholder}
            inputMode={inputMode}
            autoComplete={autoComplete}
            aria-invalid={!!error || undefined}
            aria-describedby={describedBy(id, error, hint)}
            className={inputClass(!!error)}
          />
        )}
      />
    </Field>
  );
}
