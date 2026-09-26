/**
 * Espelha os DTOs de cadastro de encarte-oferta-api:
 * - ICreateCompanyDTO / createCompanySchema (POST /companies)
 * - ICreateUserDTO / createAdminUserSchema (POST /users/admin)
 */

/** encarte-oferta-api/src/data/estabilishments.ts (ESTABILISHMENTS). */
export const ESTABILISHMENTS = [
  { value: "supermercado", label: "Supermercado" },
  { value: "acougue", label: "Açougue" },
  { value: "hortifruti", label: "Hortifrúti" },
  { value: "petshop", label: "Pet shop" },
  { value: "loja-de-eletronicos", label: "Loja de eletrônicos" },
  { value: "loja-de-materiais-de-construcao", label: "Loja de materiais de construção" },
  { value: "loja-de-pneus", label: "Loja de pneus" },
  { value: "loja-de-lubrificantes-aditivos-e-fluidos", label: "Loja de lubrificantes, aditivos e fluidos" },
  { value: "loja-de-epis", label: "Loja de EPIs" },
  { value: "loja-de-suplementos", label: "Loja de suplementos" },
] as const;

export type Estabilishment = (typeof ESTABILISHMENTS)[number]["value"];

/** UFs aceitas por createCompanySchema. */
export const UFS = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA",
  "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
] as const;

export type Uf = (typeof UFS)[number];

export interface CreateCompanyDTO {
  socialReason: string;
  fantasyName: string;
  /** Somente dígitos. */
  cnpj: string;
  email: string;
  /** DDD + número, somente dígitos (10 a 13 dígitos). */
  whatsapp: string;
  address: string;
  district: string;
  residenceNumber: string;
  city: string;
  uf: Uf;
  estabilishment: Estabilishment;
  planId: string;
}

export interface CompanyResponseDTO extends CreateCompanyDTO {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAdminUserDTO {
  companyId: string;
  name: string;
  email: string;
  /** Mínimo de 8 caracteres. */
  password: string;
  /** Somente dígitos. */
  whatsapp: string;
  /** Somente dígitos. */
  cpf: string;
}

/**
 * ISendAdminRegistrationEmailDTO (POST /users/admin/registration-email). Só as
 * credenciais: a API confere a senha e lê os dados da empresa do banco.
 */
export interface SendAdminRegistrationEmailDTO {
  email: string;
  password: string;
}

export interface UserResponseDTO {
  id: string;
  companyId: string | null;
  name: string;
  email: string;
  profile: string;
}
