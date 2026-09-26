"use client";

import { formatBRL } from "@/content/site";
import type { PlanResponseDTO } from "@/dtos/plans";
import {
  ESTABILISHMENTS,
  UFS,
  type CreateCompanyDTO,
  type Estabilishment,
  type Uf,
} from "@/dtos/registration";
import { createCompany, RegistrationError } from "@/services/registration";
import { isValidCnpj, onlyDigits } from "@/utils/documents";
import {
  brazilianCepMask,
  brazilianCnpjMask,
  brazilianPhoneOrLandlineMask,
} from "@/utils/masks";
import { planTitle } from "@/utils/plans";
import { emailValidationRegex } from "@/utils/regex";
import {
  BuildingsIcon,
  CheckCircleIcon,
  IdentificationCardIcon,
  MapPinIcon,
  StorefrontIcon,
} from "@phosphor-icons/react";
import cep from "cep-promise";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { MaskedField, SelectField, TextField } from "./Field";
import { FormAlert, FormSection, SubmitButton } from "./FormParts";

interface CompanyFormValues {
  planId: string;
  estabilishment: Estabilishment | "";
  socialReason: string;
  fantasyName: string;
  cnpj: string;
  email: string;
  whatsapp: string;
  /** Só preenche o endereço: a API não guarda o CEP. */
  cep: string;
  address: string;
  residenceNumber: string;
  district: string;
  city: string;
  uf: Uf | "";
}

const required = (label: string) => ({ required: `Informe ${label}.` });
const maxLength = (max: number) => ({
  value: max,
  message: `Use no máximo ${max} caracteres.`,
});

type CepStatus = "idle" | "loading" | "found" | "not-found";

const CEP_HINTS: Record<CepStatus, string> = {
  idle: "Digite o CEP e preenchemos rua, bairro, cidade e UF para você.",
  loading: "Buscando o endereço…",
  found: "Endereço encontrado! Confira os dados e informe o número.",
  "not-found": "Não encontramos este CEP. Confira os números ou preencha o endereço abaixo.",
};

const isUf = (value: string): value is Uf => (UFS as readonly string[]).includes(value);

interface CompanyFormProps {
  plans: PlanResponseDTO[];
  defaultPlanId?: string;
  onCreated: (companyId: string) => void;
}

export default function CompanyForm({
  plans,
  defaultPlanId,
  onCreated,
}: CompanyFormProps) {
  const {
    register,
    control,
    handleSubmit,
    setError,
    setValue,
    setFocus,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CompanyFormValues>({
    mode: "onBlur",
    defaultValues: {
      planId: defaultPlanId ?? "",
      estabilishment: "",
      socialReason: "",
      fantasyName: "",
      cnpj: "",
      email: "",
      whatsapp: "",
      cep: "",
      address: "",
      residenceNumber: "",
      district: "",
      city: "",
      uf: "",
    },
  });

  const selectedPlanId = watch("planId");
  const cepDigits = onlyDigits(watch("cep"));
  const [cepStatus, setCepStatus] = useState<CepStatus>("idle");
  const lastCepLookup = useRef("");

  // Busca o endereço assim que o CEP fica completo. Uma resposta atrasada de um CEP anterior é descartada.
  useEffect(() => {
    if (cepDigits.length !== 8) {
      lastCepLookup.current = "";
      setCepStatus("idle");
      return;
    }
    if (lastCepLookup.current === cepDigits) return;
    lastCepLookup.current = cepDigits;
    setCepStatus("loading");

    cep(cepDigits, { providers: ["brasilapi", "viacep", "widenet"], timeout: 8000 })
      .then((result) => {
        if (lastCepLookup.current !== cepDigits) return;
        const fill = (field: "address" | "district" | "city", value: string) => {
          if (value?.trim()) setValue(field, value.trim(), { shouldValidate: true, shouldDirty: true });
        };
        fill("address", result.street);
        fill("district", result.neighborhood);
        fill("city", result.city);
        if (isUf(result.state)) setValue("uf", result.state, { shouldValidate: true, shouldDirty: true });
        setCepStatus("found");
        // CEP de cidade inteira não traz rua: o usuário completa a partir dela.
        setFocus(result.street?.trim() ? "residenceNumber" : "address");
      })
      .catch(() => {
        if (lastCepLookup.current === cepDigits) setCepStatus("not-found");
      });
  }, [cepDigits, setValue, setFocus]);

  const onSubmit = async (values: CompanyFormValues) => {
    const data: CreateCompanyDTO = {
      planId: values.planId,
      estabilishment: values.estabilishment as Estabilishment,
      socialReason: values.socialReason.trim(),
      fantasyName: values.fantasyName.trim(),
      cnpj: onlyDigits(values.cnpj),
      email: values.email.trim().toLowerCase(),
      whatsapp: onlyDigits(values.whatsapp),
      address: values.address.trim(),
      residenceNumber: values.residenceNumber.trim(),
      district: values.district.trim(),
      city: values.city.trim(),
      uf: values.uf as Uf,
    };

    try {
      const company = await createCompany(data);
      onCreated(company.id);
    } catch (error) {
      const err =
        error instanceof RegistrationError
          ? error
          : new RegistrationError(
              "Não foi possível concluir o cadastro agora. Tente novamente em instantes.",
              0,
            );

      for (const field of Object.keys(err.fieldErrors)) {
        if (field in data)
          setError(field as keyof CompanyFormValues, {
            message: "Confira este campo.",
          });
      }
      // Erro de um campo só aparece no próprio campo; os demais vão para o aviso geral.
      if (
        err.apiMessage === "A company with this CNPJ already exists" ||
        err.apiMessage?.startsWith("CNPJ")
      ) {
        return setError(
          "cnpj",
          { message: err.message },
          { shouldFocus: true },
        );
      }
      setError("root", { message: err.message });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-8"
    >
      <FormSection
        icon={StorefrontIcon}
        title="Plano e ramo de atividade"
        description="Escolha o plano que combina com o volume de ofertas da sua loja. Você pode trocar de plano depois, direto no app."
      >
        <fieldset aria-describedby={errors.planId ? "planId-error" : undefined}>
          <legend className="sr-only">Plano</legend>
          <div className="grid gap-3 sm:grid-cols-3">
            {plans.map((plan) => {
              const checked = selectedPlanId === plan.id;
              return (
                <label
                  key={plan.id}
                  className={clsx(
                    "relative flex cursor-pointer flex-col gap-1 rounded-[14px] border-[1.5px] bg-surface p-4 transition",
                    "has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-brand/30",
                    checked
                      ? "border-brand-strong bg-brand-tint"
                      : errors.planId
                        ? "border-accent"
                        : "border-line hover:border-ink-soft/50",
                  )}
                >
                  <input
                    type="radio"
                    value={plan.id}
                    className="sr-only"
                    {...register("planId", {
                      required: "Escolha um plano para continuar.",
                    })}
                  />
                  <span className="flex items-center justify-between text-[15px] font-black text-ink">
                    {planTitle(plan)}
                    {checked && (
                      <CheckCircleIcon
                        size={20}
                        weight="fill"
                        className="text-brand-ink"
                      />
                    )}
                  </span>
                  <span className="text-[13px] font-bold text-ink-2">
                    {formatBRL(plan.monthValueInCents)}
                    <span className="font-semibold text-ink-soft">/mês</span>
                  </span>
                  <span className="text-[12px] text-ink-soft">
                    {plan.maxFlyerGenerations} encartes por mês
                  </span>
                </label>
              );
            })}
          </div>
          {errors.planId && (
            <p
              id="planId-error"
              role="alert"
              className="mt-2 text-[12.5px] font-semibold text-accent"
            >
              {errors.planId.message}
            </p>
          )}
        </fieldset>

        <SelectField
          id="estabilishment"
          label="Ramo de atividade"
          placeholder="Selecione o ramo da sua loja"
          options={ESTABILISHMENTS}
          hint="Atenção: o ramo não pode ser alterado depois. Ele define as categorias de produtos e os temas disponíveis."
          error={errors.estabilishment?.message}
          {...register("estabilishment", required("o ramo de atividade"))}
        />
      </FormSection>

      <FormSection
        icon={BuildingsIcon}
        title="Dados da empresa"
        description="Use os dados que constam no cartão CNPJ. Conferimos o CNPJ na Receita Federal para proteger a sua marca."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            id="socialReason"
            label="Razão social"
            placeholder="Ex.: Mercado Bom Preço Ltda."
            autoComplete="organization"
            error={errors.socialReason?.message}
            {...register("socialReason", {
              ...required("a razão social"),
              validate: (v) => !!v.trim() || "Informe a razão social.",
              maxLength: maxLength(180),
            })}
          />
          <TextField
            id="fantasyName"
            label="Nome fantasia"
            placeholder="Ex.: Mercado Bom Preço"
            hint="É o nome que seus clientes conhecem."
            error={errors.fantasyName?.message}
            {...register("fantasyName", {
              ...required("o nome fantasia"),
              validate: (v) => !!v.trim() || "Informe o nome fantasia.",
              maxLength: maxLength(180),
            })}
          />
          <MaskedField
            control={control}
            name="cnpj"
            id="cnpj"
            label="CNPJ"
            mask={brazilianCnpjMask}
            placeholder="00.000.000/0000-00"
            error={errors.cnpj?.message}
            rules={{
              ...required("o CNPJ"),
              validate: (v: string) =>
                isValidCnpj(v) ||
                "Este CNPJ não é válido. Confira os números digitados.",
            }}
          />
        </div>
      </FormSection>

      <FormSection
        icon={IdentificationCardIcon}
        title="Contato da empresa"
        description="Usamos estes contatos para falar com a sua empresa sobre a conta e o plano."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            id="email"
            type="email"
            label="E-mail da empresa"
            placeholder="contato@suaempresa.com.br"
            autoComplete="email"
            inputMode="email"
            error={errors.email?.message}
            {...register("email", {
              ...required("o e-mail da empresa"),
              pattern: {
                value: emailValidationRegex,
                message:
                  "Informe um e-mail válido, como contato@suaempresa.com.br.",
              },
            })}
          />
          <MaskedField
            control={control}
            name="whatsapp"
            id="whatsapp"
            label="WhatsApp da empresa"
            mask={brazilianPhoneOrLandlineMask}
            placeholder="(00) 00000-0000"
            autoComplete="tel-national"
            hint="Com DDD. Pode ser celular ou fixo com WhatsApp Business."
            error={errors.whatsapp?.message}
            rules={{
              ...required("o WhatsApp da empresa"),
              validate: (v: string) =>
                onlyDigits(v).length >= 10 ||
                "Informe o número completo, com DDD.",
            }}
          />
        </div>
      </FormSection>

      <FormSection
        icon={MapPinIcon}
        title="Endereço da loja"
        description="O endereço da loja física ou da sede da empresa."
      >
        <MaskedField
          control={control}
          name="cep"
          id="cep"
          label="CEP"
          mask={brazilianCepMask}
          placeholder="00000-000"
          autoComplete="postal-code"
          className="sm:max-w-[260px]"
          hint={CEP_HINTS[cepStatus]}
          error={errors.cep?.message}
          rules={{
            ...required("o CEP"),
            validate: (v: string) => onlyDigits(v).length === 8 || "O CEP tem 8 números.",
          }}
        />
        <div className="grid gap-5 sm:grid-cols-[1fr_140px]">
          <TextField
            id="address"
            label="Endereço"
            placeholder="Rua, avenida…"
            autoComplete="address-line1"
            error={errors.address?.message}
            {...register("address", {
              ...required("o endereço"),
              validate: (v) => !!v.trim() || "Informe o endereço.",
              maxLength: maxLength(180),
            })}
          />
          <TextField
            id="residenceNumber"
            label="Número"
            placeholder="Ex.: 123"
            hint="Sem número? Use S/N."
            error={errors.residenceNumber?.message}
            {...register("residenceNumber", {
              ...required("o número"),
              validate: (v) => !!v.trim() || "Informe o número.",
              maxLength: maxLength(20),
            })}
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-[1fr_1fr_110px]">
          <TextField
            id="district"
            label="Bairro"
            placeholder="Ex.: Centro"
            error={errors.district?.message}
            {...register("district", {
              ...required("o bairro"),
              validate: (v) => !!v.trim() || "Informe o bairro.",
              maxLength: maxLength(180),
            })}
          />
          <TextField
            id="city"
            label="Cidade"
            placeholder="Ex.: Belo Horizonte"
            autoComplete="address-level2"
            error={errors.city?.message}
            {...register("city", {
              ...required("a cidade"),
              validate: (v) => !!v.trim() || "Informe a cidade.",
              maxLength: maxLength(180),
            })}
          />
          <SelectField
            id="uf"
            label="UF"
            placeholder="UF"
            autoComplete="address-level1"
            options={UFS.map((uf) => ({ value: uf, label: uf }))}
            error={errors.uf?.message}
            {...register("uf", { required: "Informe a UF." })}
          />
        </div>
      </FormSection>

      {errors.root && <FormAlert>{errors.root.message}</FormAlert>}

      <SubmitButton
        loading={isSubmitting}
        loadingLabel="Conferindo o CNPJ e cadastrando…"
      >
        Cadastrar empresa e continuar
      </SubmitButton>
    </form>
  );
}
