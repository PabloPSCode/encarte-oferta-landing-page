/**
 * Fonte única dos dados reais usados na landing page e nas páginas legais.
 *
 * Os valores foram extraídos de encarte-oferta-web (src/config/environment.ts,
 * src/data/support.ts) e encarte-oferta-api (src/data/faqs.ts,
 * prisma/schema.prisma, src/data/estabilishments.ts). Ao mudar uma regra de
 * negócio nesses repositórios, atualize aqui.
 */

export const SITE = {
  name: "Encarte Oferta",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://encarteoferta.com.br",
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "https://app.encarteoferta.com.br",
};

/**
 * Operador da plataforma (controlador dos dados, para fins da LGPD).
 * CNPJ, endereço e comarca do foro não constam nos repositórios: preencha
 * aqui antes de publicar. Campos vazios não são exibidos nas páginas legais.
 */
export const COMPANY = {
  legalName: "PLS Sistemas",
  cnpj: "",
  address: "",
  forum: "",
};

export const SUPPORT = {
  email: "contato@plssistemas.com.br",
  whatsapp: "553194817962",
  whatsappLabel: "(31) 9481-7962",
  whatsappHours: "Segunda a sexta, das 9h às 18h",
  emailHours: "Respondemos em até 1 dia útil, de segunda a sexta",
};

export const LEGAL_UPDATED_AT = "23 de setembro de 2026";

export function whatsappLink(message: string) {
  return `https://wa.me/${SUPPORT.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const CTA_LINK = whatsappLink(
  "Olá! Quero conhecer o Encarte Oferta e contratar um plano para a minha loja."
);

export const PLANS_LINK = whatsappLink(
  "Olá! Quero saber os valores dos planos do Encarte Oferta (Start, Avançado e Profissional)."
);

/** Ramos de atividade aceitos no cadastro (encarte-oferta-api/src/data/estabilishments.ts). */
export const SEGMENTS = [
  { label: "Supermercado", icon: "ShoppingCart" },
  { label: "Açougue", icon: "Knife" },
  { label: "Hortifrúti", icon: "Carrot" },
  { label: "Pet shop", icon: "PawPrint" },
  { label: "Loja de eletrônicos", icon: "DeviceMobile" },
  { label: "Materiais de construção", icon: "HardHat" },
  { label: "Loja de pneus", icon: "Tire" },
  { label: "Lubrificantes, aditivos e fluidos", icon: "Drop" },
  { label: "EPIs", icon: "ShieldCheck" },
  { label: "Suplementos", icon: "Barbell" },
] as const;

/** Perguntas selecionadas da central de ajuda (encarte-oferta-api/src/data/faqs.ts). */
export const FAQ = [
  {
    q: "O que é o Encarte Oferta?",
    a: "É uma plataforma para criar encartes de ofertas (imagens para feed e stories), transformá-los em vídeos narrados e agendar a publicação no Instagram e no Facebook. Tudo fica ligado à sua empresa e ao plano contratado.",
  },
  {
    q: "O que preciso para começar?",
    a: "Os dados da empresa (razão social, nome fantasia, CNPJ ativo na Receita Federal, endereço e ramo de atividade) e a configuração do encarte: logo, slogan, cores, telefone, WhatsApp, redes sociais, endereço, site e formas de pagamento aceitas. Esses dados aparecem automaticamente no rodapé dos encartes e dos vídeos.",
  },
  {
    q: "Preciso cadastrar todos os meus produtos?",
    a: "Não. O catálogo tem mais de 40 mil produtos com foto, EAN e unidade, prontos para usar. Para itens próprios, como produtos caseiros, a granel ou cortes feitos na loja, você cadastra um produto personalizado com foto em PNG, JPEG ou WEBP de até 7 MB, e o fundo é removido automaticamente.",
  },
  {
    q: "Como funcionam os créditos do plano?",
    a: "Cada plano tem uma cota mensal de encartes, temas gerados com IA e vídeos gerados com IA. Cada geração consome 1 crédito. Se a geração falhar, o crédito volta para você automaticamente. Os créditos são renovados todo dia 1º, à 00h (horário de Brasília), e o saldo não usado não acumula para o mês seguinte.",
  },
  {
    q: "Posso mudar de plano no meio do mês?",
    a: "Sim. Ao trocar de plano, a cota do novo plano é somada ao saldo atual, e os créditos já usados continuam contabilizados.",
  },
  {
    q: "Em quais redes consigo publicar?",
    a: "Você conecta suas contas do Instagram e do Facebook e agenda a publicação no feed, nos stories ou nos reels (reels apenas para vídeos). Também é possível baixar a imagem em alta resolução, baixar o vídeo ou enviar direto pelo WhatsApp.",
  },
  {
    q: "Posso ter mais de uma pessoa usando a conta?",
    a: "Sim. Cada empresa tem um administrador, que cria os usuários da equipe. Os usuários criam encartes, vídeos, produtos, temas, conexões e agendamentos.",
  },
  {
    q: "Posso mudar o ramo de atividade depois?",
    a: "Não. O ramo é definido no cadastro e determina as categorias de produtos e os temas disponíveis. Ramos maiores já incluem categorias de outros: um supermercado, por exemplo, também tem acesso a categorias pet.",
  },
] as const;

export function formatBRL(cents: number) {
  return (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
