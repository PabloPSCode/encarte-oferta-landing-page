"use client";

import type { CreateAdminUserDTO } from "@/dtos/registration";
import { createAdminUser, RegistrationError, sendAdminRegistrationEmail } from "@/services/registration";
import { isValidCpf, onlyDigits } from "@/utils/documents";
import { brazilianCpfMask, brazilianPhoneOrLandlineMask } from "@/utils/masks";
import { emailValidationRegex } from "@/utils/regex";
import { LockKey, UserCircle } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { MaskedField, PasswordField, TextField } from "./Field";
import { FormAlert, FormSection, SubmitButton } from "./FormParts";

interface AdminFormValues {
  name: string;
  cpf: string;
  email: string;
  whatsapp: string;
  password: string;
  passwordConfirmation: string;
}

/** Respostas da API que invalidam o companyId salvo: não adianta tentar de novo com ele. */
export type AdminFailure = "company-not-found" | "company-has-admin";

export interface AdminCreatedResult {
  email: string;
  /** Se o e-mail de boas-vindas saiu. O cadastro vale mesmo quando ele falha. */
  emailSent: boolean;
}

interface AdminFormProps {
  companyId: string;
  onCreated: (result: AdminCreatedResult) => void;
  onCompanyUnavailable: (reason: AdminFailure, message: string) => void;
}

export default function AdminForm({ companyId, onCreated, onCompanyUnavailable }: AdminFormProps) {
  const {
    register,
    control,
    handleSubmit,
    setError,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<AdminFormValues>({
    mode: "onBlur",
    defaultValues: { name: "", cpf: "", email: "", whatsapp: "", password: "", passwordConfirmation: "" },
  });

  const onSubmit = async (values: AdminFormValues) => {
    const data: CreateAdminUserDTO = {
      companyId,
      name: values.name.trim(),
      cpf: onlyDigits(values.cpf),
      email: values.email.trim().toLowerCase(),
      whatsapp: onlyDigits(values.whatsapp),
      password: values.password,
    };

    try {
      await createAdminUser(data);
    } catch (error) {
      const err =
        error instanceof RegistrationError
          ? error
          : new RegistrationError("Não foi possível concluir o cadastro agora. Tente novamente em instantes.", 0);

      if (err.apiMessage === "Company not found") return onCompanyUnavailable("company-not-found", err.message);
      if (err.apiMessage === "This company already has an admin") return onCompanyUnavailable("company-has-admin", err.message);

      for (const field of Object.keys(err.fieldErrors)) {
        if (field in values) setError(field as keyof AdminFormValues, { message: "Confira este campo." });
      }
      // Erro de um campo só aparece no próprio campo; os demais vão para o aviso geral.
      if (err.apiMessage === "Invalid CPF") return setError("cpf", { message: err.message }, { shouldFocus: true });
      if (err.apiMessage === "A user with this email already exists") {
        return setError("email", { message: err.message }, { shouldFocus: true });
      }
      return setError("root", { message: err.message });
    }

    // O administrador já existe: uma falha no e-mail não desfaz o cadastro, só muda o aviso final.
    const emailSent = await sendAdminRegistrationEmail({ email: data.email, password: data.password })
      .then(() => true)
      .catch(() => false);
    onCreated({ email: data.email, emailSent });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-8">
      <FormSection
        icon={UserCircle}
        title="Seus dados"
        description="Você será o administrador da empresa no Encarte Oferta: é quem gerencia o plano e cria os acessos da sua equipe."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            id="name"
            label="Nome completo"
            placeholder="Como você se chama?"
            autoComplete="name"
            className="sm:col-span-2"
            error={errors.name?.message}
            {...register("name", {
              required: "Informe o seu nome.",
              validate: (v) => !!v.trim() || "Informe o seu nome.",
              maxLength: { value: 120, message: "Use no máximo 120 caracteres." },
            })}
          />
          <MaskedField
            control={control}
            name="cpf"
            id="cpf"
            label="CPF"
            mask={brazilianCpfMask}
            placeholder="000.000.000-00"
            hint="Usamos o CPF apenas para identificar o responsável pela conta."
            error={errors.cpf?.message}
            rules={{
              required: "Informe o seu CPF.",
              validate: (v: string) => isValidCpf(v) || "Este CPF não é válido. Confira os números digitados.",
            }}
          />
          <MaskedField
            control={control}
            name="whatsapp"
            id="adminWhatsapp"
            label="Seu WhatsApp"
            mask={brazilianPhoneOrLandlineMask}
            placeholder="(00) 00000-0000"
            autoComplete="tel-national"
            hint="Com DDD. Pode ser diferente do WhatsApp da empresa."
            error={errors.whatsapp?.message}
            rules={{
              required: "Informe o seu WhatsApp.",
              validate: (v: string) => onlyDigits(v).length >= 10 || "Informe o número completo, com DDD.",
            }}
          />
        </div>
      </FormSection>

      <FormSection
        icon={LockKey}
        title="Seu acesso ao app"
        description="É com este e-mail e esta senha que você vai entrar no Encarte Oferta."
      >
        <TextField
          id="adminEmail"
          type="email"
          label="E-mail de acesso"
          placeholder="voce@suaempresa.com.br"
          autoComplete="email"
          inputMode="email"
          error={errors.email?.message}
          {...register("email", {
            required: "Informe o seu e-mail.",
            pattern: { value: emailValidationRegex, message: "Informe um e-mail válido, como voce@suaempresa.com.br." },
          })}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <PasswordField
            id="password"
            label="Senha"
            placeholder="Mínimo de 8 caracteres"
            autoComplete="new-password"
            hint="Use pelo menos 8 caracteres. Misturar letras, números e símbolos deixa a senha mais segura."
            error={errors.password?.message}
            {...register("password", {
              required: "Crie uma senha.",
              minLength: { value: 8, message: "A senha precisa ter pelo menos 8 caracteres." },
            })}
          />
          <PasswordField
            id="passwordConfirmation"
            label="Confirme a senha"
            placeholder="Digite a senha de novo"
            autoComplete="new-password"
            error={errors.passwordConfirmation?.message}
            {...register("passwordConfirmation", {
              required: "Confirme a sua senha.",
              validate: (v) => v === getValues("password") || "As senhas não são iguais.",
            })}
          />
        </div>
      </FormSection>

      {errors.root && <FormAlert>{errors.root.message}</FormAlert>}

      <SubmitButton loading={isSubmitting} loadingLabel="Criando o seu acesso…">
        Concluir cadastro
      </SubmitButton>
    </form>
  );
}
