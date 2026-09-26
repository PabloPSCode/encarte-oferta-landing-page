import type {
  CompanyResponseDTO,
  CreateAdminUserDTO,
  CreateCompanyDTO,
  SendAdminRegistrationEmailDTO,
  UserResponseDTO,
} from "@/dtos/registration";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

/** Chave do localStorage que guarda a empresa já cadastrada, até o administrador ser criado. */
export const PENDING_COMPANY_KEY = "encarte-oferta:cadastro:companyId";

/**
 * Erro de uma rota de cadastro, já com a mensagem em português para a tela.
 * `fieldErrors` traz os erros de validação por campo (ZodValidationPipe da API).
 */
export class RegistrationError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly apiMessage?: string,
    readonly fieldErrors: Record<string, string[]> = {}
  ) {
    super(message);
  }
}

/** Mensagens de AppError da API (CreateCompanyUseCase, CreateAdminUserUseCase, userRules). */
const API_MESSAGES: Record<string, string> = {
  "A company with this CNPJ already exists":
    "Já existe uma empresa cadastrada com este CNPJ. Se ela é sua, fale com o nosso suporte.",
  "Plan not found": "O plano escolhido não está mais disponível. Atualize a página e escolha outro plano.",
  "Could not verify the CNPJ right now. Please try again shortly.":
    "Não conseguimos consultar a Receita Federal agora. Aguarde alguns instantes e tente de novo.",
  "CNPJ is not registered on the tax registry":
    "Não encontramos este CNPJ na Receita Federal. Confira os números digitados.",
  "Invalid CPF": "O CPF informado não é válido. Confira os números digitados.",
  "A user with this email already exists": "Já existe um usuário com este e-mail. Use outro e-mail ou entre no app.",
  "This company already has an admin":
    "Esta empresa já tem um administrador cadastrado. Entre no app com o e-mail e a senha dele.",
  "Company not found": "Não encontramos a empresa deste cadastro. Vamos começar de novo pelos dados da empresa.",
};

async function post<T>(path: string, body: unknown): Promise<T> {
  if (!API_URL) {
    throw new RegistrationError(
      "O cadastro está indisponível no momento. Tente novamente mais tarde ou fale com o nosso suporte.",
      0
    );
  }

  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new RegistrationError("Não conseguimos conectar ao servidor. Verifique sua internet e tente de novo.", 0);
  }

  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    const apiMessage: string | undefined = typeof json?.message === "string" ? json.message : undefined;
    const fieldErrors: Record<string, string[]> = json?.errors?.fieldErrors ?? {};
    const message =
      (apiMessage && API_MESSAGES[apiMessage]) ||
      (Object.keys(fieldErrors).length
        ? "Alguns dados não foram aceitos. Confira os campos destacados."
        : "Não foi possível concluir o cadastro agora. Tente novamente em instantes.");
    throw new RegistrationError(message, res.status, apiMessage, fieldErrors);
  }

  // 204 (sem corpo) chega aqui como {}.
  return (json as { data: T }).data;
}

export function createCompany(data: CreateCompanyDTO) {
  return post<CompanyResponseDTO>("/companies", data);
}

export function createAdminUser(data: CreateAdminUserDTO) {
  return post<UserResponseDTO>("/users/admin", data);
}

/** Envia ao administrador o e-mail de boas-vindas com os dados da empresa e do primeiro acesso. */
export function sendAdminRegistrationEmail(data: SendAdminRegistrationEmailDTO) {
  return post<void>("/users/admin/registration-email", data);
}
