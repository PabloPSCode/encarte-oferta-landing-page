import type { Icon } from "@phosphor-icons/react";
import {
  ArrowsClockwise,
  CalendarCheck,
  ChatCircleText,
  ClockCountdown,
  CreditCard,
  FilmSlate,
  MagicWand,
  Package,
  SquaresFour,
  Storefront,
  Tag,
  UsersThree,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";

/**
 * Páginas dedicadas por segmento (rotas /[segmento]).
 *
 * A copy parte dos roteiros comerciais (comercial_scrips_encarte-oferta.docx) e
 * só promete o que a plataforma entrega hoje: os mesmos recursos descritos em
 * site.ts e nas seções da página inicial. Ao mudar um recurso, revise aqui.
 *
 * As artes ficam em public/estabilishments: encartes gerados na plataforma,
 * ampliados 4x com Real-ESRGAN e exportados em WebP com 1080px de largura.
 */

/** Todas as artes de public/estabilishments saem do upscale nesse tamanho. */
export const FLYER_SIZE = { width: 1080, height: 1331 } as const;

export interface SegmentPage {
  slug: string;
  /** Nome no plural, usado nos cards da seção Segmentos e no "Veja também". */
  label: string;
  flyer: { src: string; alt: string };
  /** Cor dominante do encarte, usada no brilho atrás da arte. */
  glow: string;
  meta: { title: string; description: string };
  eyebrow: string;
  /** Título em três partes: o trecho do meio ganha o selo vermelho. */
  headline: [before: string, highlight: string, after: string];
  lead: string;
  pains: { title: string; body: string }[];
  /** Seção "Como funciona". Sem ela, a página não mostra a seção nem o botão que leva até ela. */
  how?: { title: string; steps: { title: string; body: string }[] };
  benefitsTitle: string;
  benefits: { icon: Icon; title: string; body: string }[];
  shift: { before: string[]; after: string[] };
  closing: { title: string; body: string };
  whatsappMessage: string;
}

export const SEGMENT_PAGES: SegmentPage[] = [
  {
    slug: "supermercados-e-mercearias",
    label: "Supermercados e mercearias",
    flyer: {
      src: "/estabilishments/supermercado-e-mercearia.webp",
      alt: "Encarte de supermercado “Preço Baixo Todo Dia” com chocolates, biscoitos, azeite e café, criado no Encarte Oferta",
    },
    glow: "#E5163F",
    meta: {
      title: "Encartes de ofertas para supermercados e mercearias",
      description:
        "Crie encartes de ofertas profissionais em minutos, sem depender de designer, e publique as promoções do seu supermercado no Instagram, no Facebook e no WhatsApp.",
    },
    eyebrow: "Para supermercados, mercearias e mercadinhos",
    headline: ["A promoção começa amanhã. O encarte fica pronto", "hoje", "."],
    lead: "O designer não respondeu, os preços mudaram e seus clientes ainda nem sabem das ofertas. Com o Encarte Oferta, o seu supermercado cria encartes profissionais em poucos minutos, com a cara da sua loja, prontos para as redes sociais e o WhatsApp.",
    pains: [
      {
        title: "Refém do designer",
        body: "Cada promoção depende de alguém de fora. Se ele atrasa, a sua oferta atrasa junto, e o fim de semana não espera.",
      },
      {
        title: "Preço mudou, arte refeita",
        body: "O fornecedor reajustou, um item acabou, entrou uma oferta nova. Lá se vai mais um pedido de alteração e mais um dia perdido.",
      },
      {
        title: "Encarte pronto quando a oferta já começou",
        body: "O cliente decide onde fazer a compra da semana antes de sair de casa. Se a sua oferta não chegou até ele, quem vende é o concorrente.",
      },
    ],
    benefitsTitle: "Agilidade para quem vive de oferta",
    benefits: [
      {
        icon: Package,
        title: "+40 mil produtos com foto",
        body: "Busque pelo nome ou pelo EAN e coloque o produto no encarte sem fotografar nada.",
      },
      {
        icon: SquaresFour,
        title: "Até 12 ofertas em cada encarte",
        body: "Escolha de 1 a 12 produtos por encarte e destaque as ofertas mais fortes da semana, da mercearia ao hortifrúti.",
      },
      {
        icon: UsersThree,
        title: "A equipe toda na mesma conta",
        body: "O administrador cria os usuários, e o responsável por cada setor monta as próprias ofertas.",
      },
      {
        icon: CalendarCheck,
        title: "Ofertas agendadas",
        body: "Programe as publicações da semana no feed, nos stories e nos reels, com data e hora.",
      },
    ],
    shift: {
      before: [
        "Promoção parada esperando o designer responder",
        "Arte refeita a cada mudança de preço",
        "Cliente descobrindo a oferta só quando entra na loja",
      ],
      after: [
        "Encarte pronto em minutos, feito pela sua equipe",
        "Encarte salvo, editado e publicado de novo",
        "Ofertas no celular do cliente antes da compra da semana",
      ],
    },
    closing: {
      title: "Pare de depender de terceiros para colocar suas promoções no ar",
      body: "Fale com a nossa equipe, escolha o plano e publique o próximo encarte do seu supermercado hoje mesmo.",
    },
    whatsappMessage: "Olá! Tenho um supermercado e quero conhecer o Encarte Oferta.",
  },
  {
    slug: "acougues",
    label: "Açougues",
    flyer: {
      src: "/estabilishments/acougue.webp",
      alt: "Encarte de açougue “Corte de Preços” com cortes bovinos, linguiça e espetinhos, criado no Encarte Oferta",
    },
    glow: "#D21B1B",
    meta: {
      title: "Encartes de ofertas para açougues",
      description:
        "Transforme cortes, carnes e combos de churrasco em encartes profissionais em minutos e publique no Instagram, no Facebook e no WhatsApp antes do concorrente.",
    },
    eyebrow: "Para açougues e casas de carnes",
    headline: ["Divulgue seus cortes", "antes", "do concorrente"],
    lead: "Você acabou de definir o preço da picanha, da costela e da linguiça para o fim de semana. Enquanto ainda pensa em como divulgar, o concorrente já postou as ofertas dele. Com o Encarte Oferta, o seu açougue transforma carnes, cortes e combos em encartes profissionais em poucos minutos.",
    pains: [
      {
        title: "A oferta fica pronta, a divulgação não",
        body: "Os preços do fim de semana estão decididos, mas a arte depende de um designer, de um parente ou de uma tarde inteira no celular.",
      },
      {
        title: "Foto improvisada não vende carne",
        body: "Um corte bonito em uma foto escura, com o preço escrito por cima, não desperta vontade de comprar. Carne se vende pelos olhos.",
      },
      {
        title: "O cliente decide antes de sair de casa",
        body: "Quem está planejando o churrasco escolhe o açougue pelo celular. Se a sua oferta não aparece nessa hora, a venda vai para outro balcão.",
      },
    ],
    benefitsTitle: "Feito para quem vende carne",
    benefits: [
      {
        icon: Storefront,
        title: "Cortes da casa com cara de vitrine",
        body: "Linguiça artesanal, espetinho temperado, kit churrasco: fotografe, envie e o produto entra no encarte sem fundo, combinando com o tema.",
      },
      {
        icon: CalendarCheck,
        title: "Oferta do fim de semana agendada",
        body: "Monte o encarte na quinta e programe a publicação para sexta de manhã no feed, nos stories ou nos reels.",
      },
      {
        icon: FilmSlate,
        title: "Vídeo que dá água na boca",
        body: "O encarte vira vídeo com preços animados e narração em português, no formato que mais circula no Instagram.",
      },
      {
        icon: Tag,
        title: "“De / por” que mostra a vantagem",
        body: "Exiba o preço anterior ao lado do preço da oferta e deixe claro por que vale a pena comprar no seu balcão.",
      },
    ],
    shift: {
      before: [
        "Preço escrito por cima de uma foto tirada no balcão",
        "Esperar alguém montar a arte a cada promoção",
        "Oferta publicada quando o cliente já comprou",
      ],
      after: [
        "Encarte profissional com o logo e as cores do açougue",
        "Arte pronta em minutos, feita por você ou pela equipe",
        "Publicação agendada para a hora em que o cliente decide",
      ],
    },
    closing: {
      title: "Suas ofertas de carne no ar antes do próximo churrasco",
      body: "Fale com a nossa equipe, escolha o plano e publique o primeiro encarte do seu açougue antes do fim de semana.",
    },
    whatsappMessage: "Olá! Tenho um açougue e quero conhecer o Encarte Oferta.",
  },
  {
    slug: "feiras-e-sacoloes",
    label: "Feiras e sacolões",
    flyer: {
      src: "/estabilishments/feira-e-sacolao.webp",
      alt: "Encarte de hortifrúti “Frescor em Oferta” com cenoura, maçã, melancia, abacaxi e mamão, criado no Encarte Oferta",
    },
    glow: "#3F9B2F",
    meta: {
      title: "Encartes de ofertas para feiras, sacolões e hortifrútis",
      description:
        "Divulgue as ofertas do dia de frutas, verduras e legumes em minutos. Atualize os preços, publique nas redes e no WhatsApp e gire o estoque enquanto o produto está fresco.",
    },
    eyebrow: "Para feiras, sacolões e hortifrútis",
    headline: ["Divulgue a oferta do dia", "enquanto", "o produto está fresco"],
    lead: "No hortifrúti, o preço muda rápido, e o produto que não vende hoje vira prejuízo amanhã. Com o Encarte Oferta, você cria e atualiza as promoções do dia em poucos minutos e coloca frutas, verduras e legumes na frente do cliente enquanto a oferta ainda faz sentido.",
    pains: [
      {
        title: "O estoque não espera a arte",
        body: "Tomate maduro, banana no ponto, folhas do dia: cada hora sem divulgação é mercadoria perdendo valor na banca.",
      },
      {
        title: "Preço que muda toda manhã",
        body: "Você ajusta os valores conforme a compra do dia, mas refazer uma arte do zero a cada mudança não cabe na rotina.",
      },
      {
        title: "Quem não sabe da oferta não vem",
        body: "O freguês passa no supermercado do lado porque não viu que a sua melancia estava em promoção.",
      },
    ],
    how: {
      title: "A oferta do dia no ar em quatro etapas",
      steps: [
        {
          title: "Escolha o tema",
          body: "Temas de hortifrúti prontos para as ofertas do dia, da semana ou de datas comemorativas, ou gerados com IA.",
        },
        {
          title: "Selecione frutas, verduras e legumes",
          body: "Use o catálogo com foto ou cadastre os itens a granel com uma foto: o fundo é removido automaticamente.",
        },
        {
          title: "Atualize os preços",
          body: "Defina os valores e a validade, inclusive a oferta válida só para um dia, e personalize com a sua marca.",
        },
        {
          title: "Publique e compartilhe",
          body: "Agende no Instagram e no Facebook ou envie direto pelo WhatsApp para os seus fregueses.",
        },
      ],
    },
    benefitsTitle: "Mais giro, menos desperdício",
    benefits: [
      {
        icon: ArrowsClockwise,
        title: "Preço novo em minutos",
        body: "Abra o encarte de ontem, troque os preços e os produtos que mudaram e publique de novo. Sem começar do zero.",
      },
      {
        icon: ClockCountdown,
        title: "Oferta válida só para hoje",
        body: "Imprima a validade na arte, por período, para um único dia ou até uma data, e crie senso de urgência.",
      },
      {
        icon: WhatsappLogo,
        title: "Direto no WhatsApp do freguês",
        body: "Baixe em alta resolução ou envie pelo WhatsApp para quem compra com você toda semana.",
      },
      {
        icon: SquaresFour,
        title: "O melhor da banca no encarte",
        body: "De 1 a 12 produtos por encarte para destacar o que chegou mais fresco e o que precisa girar hoje.",
      },
    ],
    shift: {
      before: [
        "Lista de preços em texto que ninguém lê até o fim",
        "Arte refeita do zero toda vez que o preço muda",
        "Mercadoria passando do ponto na banca",
      ],
      after: [
        "Encarte colorido que mostra o frescor dos produtos",
        "Encarte salvo, atualizado e republicado em minutos",
        "Oferta divulgada enquanto o produto ainda está fresco",
      ],
    },
    closing: {
      title: "Menos desperdício, mais giro e mais fregueses sabendo das ofertas",
      body: "Fale com a nossa equipe e publique o primeiro encarte da sua feira ou sacolão ainda hoje.",
    },
    whatsappMessage: "Olá! Tenho um sacolão/hortifrúti e quero conhecer o Encarte Oferta.",
  },
  {
    slug: "pet-shops",
    label: "Pet shops",
    flyer: {
      src: "/estabilishments/petshop.webp",
      alt: "Encarte de pet shop “Latidos de Ofertas” com rações, petiscos e brinquedos, criado no Encarte Oferta",
    },
    glow: "#F26B1D",
    meta: {
      title: "Encartes de ofertas para pet shops",
      description:
        "Apresente rações, petiscos e acessórios em encartes profissionais e vídeos para as redes, com a cara do seu pet shop e sem precisar de uma equipe de marketing.",
    },
    eyebrow: "Para pet shops e casas de ração",
    headline: ["Divulgue como uma grande rede,", "sem", "a equipe de marketing de uma"],
    lead: "Seu pet shop pode ter bons preços, variedade e um ótimo atendimento. Mas se a sua promoção aparece em uma foto improvisada enquanto a grande rede publica campanhas profissionais, quem chama mais atenção? Com o Encarte Oferta, seus produtos viram campanhas bonitas e com a cara da sua loja em poucos minutos.",
    pains: [
      {
        title: "A grande rede parece mais barata",
        body: "Mesmo quando o seu preço é melhor, a campanha caprichada da concorrência passa a impressão de que a oferta está lá.",
      },
      {
        title: "Foto da prateleira não encanta",
        body: "Tutor compra com o coração. Um saco de ração fotografado no estoque não desperta a mesma vontade que um encarte bem feito.",
      },
      {
        title: "Sem tempo entre banho, tosa e balcão",
        body: "O dia já é cheio. Montar arte no celular sempre fica para depois, e a promoção passa sem ninguém ver.",
      },
    ],
    benefitsTitle: "Tudo que o seu pet shop precisa para aparecer",
    benefits: [
      {
        icon: MagicWand,
        title: "Temas que encantam tutores",
        body: "Mais de 300 temas prontos e temas gerados com IA para campanhas com visual de grande marca.",
      },
      {
        icon: FilmSlate,
        title: "Vídeo narrado para Reels e Stories",
        body: "O encarte vira vídeo com preços animados e narração em português, para quem passa o dia rolando o feed.",
      },
      {
        icon: WhatsappLogo,
        title: "Direto no WhatsApp do tutor",
        body: "Envie o encarte para a sua lista de clientes e lembre que está na hora de repor a ração.",
      },
      {
        icon: Storefront,
        title: "A cara da sua loja em cada arte",
        body: "Logo, cores, telefone, WhatsApp, endereço e formas de pagamento aplicados automaticamente no rodapé.",
      },
    ],
    shift: {
      before: [
        "Foto improvisada da prateleira",
        "Promoção que quase ninguém fica sabendo",
        "Arte que fica para depois do banho e tosa",
      ],
      after: [
        "Campanha bonita com a identidade do pet shop",
        "Oferta no feed, nos stories e no WhatsApp",
        "Encarte pronto em minutos, entre um atendimento e outro",
      ],
    },
    closing: {
      title: "Você não precisa de uma grande equipe para divulgar como uma grande loja",
      body: "Fale com a nossa equipe e publique o primeiro encarte do seu pet shop ainda hoje.",
    },
    whatsappMessage: "Olá! Tenho um pet shop e quero conhecer o Encarte Oferta.",
  },
  {
    slug: "lojas-de-materiais-de-construcao",
    label: "Lojas de materiais de construção",
    flyer: {
      src: "/estabilishments/loja-de-materiais-de-construcao.webp",
      alt: "Encarte de loja de materiais de construção “Semana da Obra” com cimento, areia, argamassa, escada e porcelanato, criado no Encarte Oferta",
    },
    glow: "#6B3FA0",
    meta: {
      title: "Encartes de ofertas para lojas de materiais de construção",
      description:
        "Divulgue cimento, tinta, piso, ferramentas e acabamentos em encartes profissionais e faça suas ofertas chegarem ao cliente antes que ele pesquise na loja do lado.",
    },
    eyebrow: "Para lojas de materiais de construção",
    headline: ["Pare de só responder preço.", "Comece", "a divulgar ofertas"],
    lead: "Todo dia alguém pergunta quanto custa o cimento, a tinta, o piso ou uma ferramenta. E enquanto pesquisa, esse cliente também consulta outras lojas. Com o Encarte Oferta, seus principais produtos e preços viram encartes profissionais que chegam ao cliente antes mesmo da pergunta.",
    pains: [
      {
        title: "“Quanto está o saco de cimento?”",
        body: "Sua equipe repete os mesmos preços o dia inteiro, no balcão, no telefone e no WhatsApp.",
      },
      {
        title: "Quem pesquisa, compara",
        body: "Enquanto espera a sua resposta, o cliente consulta a concorrência. Quem mostra a oferta primeiro sai na frente.",
      },
      {
        title: "Obra tem prazo e lista longa",
        body: "Quem está construindo ou reformando compra em volume e quer ver condições. Uma foto solta no status não mostra isso.",
      },
    ],
    benefitsTitle: "Do básico ao acabamento, tudo no encarte",
    benefits: [
      {
        icon: SquaresFour,
        title: "Uma campanha para cada linha",
        body: "Básico, hidráulica, elétrica, pintura e acabamento: monte encartes de 1 a 12 produtos para cada linha da loja.",
      },
      {
        icon: CreditCard,
        title: "Parcelamento que fecha a venda",
        body: "Mostre o parcelamento e o preço “de / por” na arte. Em compra de obra, a condição pesa tanto quanto o preço.",
      },
      {
        icon: CalendarCheck,
        title: "Campanha da semana agendada",
        body: "Programe a publicação no feed, nos stories e nos reels com data e hora, e mantenha a loja ativa nas redes.",
      },
      {
        icon: FilmSlate,
        title: "Vídeo narrado para os Reels",
        body: "Transforme o encarte em vídeo com preços animados e narração em português para alcançar quem está planejando a obra.",
      },
    ],
    shift: {
      before: [
        "Equipe repetindo o mesmo preço o dia todo",
        "Cliente pesquisando na concorrência enquanto espera",
        "Ofertas que só quem entra na loja descobre",
      ],
      after: [
        "Preços principais divulgados antes da pergunta",
        "Cliente chegando sabendo o que quer comprar",
        "Oportunidades de compra nas redes e no WhatsApp",
      ],
    },
    closing: {
      title: "Em vez de apenas responder preço, divulgue oportunidades de compra",
      body: "Fale com a nossa equipe e coloque a primeira campanha da sua loja no ar ainda hoje.",
    },
    whatsappMessage: "Olá! Tenho uma loja de materiais de construção e quero conhecer o Encarte Oferta.",
  },
  {
    slug: "lojas-de-pneus",
    label: "Lojas de pneus",
    flyer: {
      src: "/estabilishments/loja-de-pneus.webp",
      alt: "Encarte de loja de pneus “Rodando com Economia” com pneus Bridgestone e Goodyear em 12x, criado no Encarte Oferta",
    },
    glow: "#1E3FA8",
    meta: {
      title: "Encartes de ofertas para lojas de pneus",
      description:
        "Transforme pneus, medidas, marcas, preços e parcelamento em campanhas prontas para divulgação e receba clientes que já sabem o que querem comprar.",
    },
    eyebrow: "Para lojas de pneus e centros automotivos",
    headline: ["Menos “quanto está o aro 13?”, mais cliente", "pronto", "para comprar"],
    lead: "“Quanto está o 175/70 aro 13?” “Tem 185/65 aro 15?” “Parcela em quantas vezes?” Sua equipe responde as mesmas perguntas todos os dias, enquanto o cliente compara preços em outras lojas. Com o Encarte Oferta, pneus, medidas, preços e condições de pagamento viram campanhas prontas para divulgar.",
    pains: [
      {
        title: "As mesmas perguntas, o dia inteiro",
        body: "Medida, marca, preço e parcelamento. Cada atendimento repete a mesma conversa, e o tempo da equipe vai embora.",
      },
      {
        title: "Cliente de pneu compara tudo",
        body: "Ele pesquisa em três, quatro lojas antes de decidir. Quem mostra a condição completa primeiro ganha a preferência.",
      },
      {
        title: "Parcelamento escondido não vende",
        body: "Se o cliente não vê a parcela logo de cara, acha que o pneu está caro e nem chega a perguntar.",
      },
    ],
    benefitsTitle: "Feito para quem vende pneu",
    benefits: [
      {
        icon: CreditCard,
        title: "Parcelamento em destaque",
        body: "Mostre o valor da parcela ao lado do preço, como nos grandes varejistas, e derrube a objeção de que está caro.",
      },
      {
        icon: Tag,
        title: "“De / por” que prova a economia",
        body: "Exiba o preço anterior e o preço da oferta para o cliente enxergar quanto está economizando.",
      },
      {
        icon: ChatCircleText,
        title: "Menos tempo repetindo informação",
        body: "Medida, marca, preço e condição já estão na arte. A conversa começa com quem sabe o que quer.",
      },
      {
        icon: FilmSlate,
        title: "Vídeo para Reels e Stories",
        body: "O encarte vira vídeo narrado com preços animados, pronto para alcançar motoristas no Instagram e no Facebook.",
      },
    ],
    shift: {
      before: [
        "Equipe respondendo medida e preço um por um",
        "Cliente achando caro por não ver o parcelamento",
        "Oferta perdida entre as mensagens do WhatsApp",
      ],
      after: [
        "Medidas, marcas e preços claros em um só encarte",
        "Parcela e preço “de / por” em destaque na arte",
        "Mais conversas com clientes prontos para comprar",
      ],
    },
    closing: {
      title: "Menos tempo repetindo informação, mais conversa com quem quer comprar",
      body: "Fale com a nossa equipe e publique o primeiro encarte da sua loja de pneus ainda esta semana.",
    },
    whatsappMessage: "Olá! Tenho uma loja de pneus e quero conhecer o Encarte Oferta.",
  },
  {
    slug: "lojas-de-epis",
    label: "Lojas de EPIs",
    flyer: {
      src: "/estabilishments/loja-de-epis.webp",
      alt: "Encarte de loja de EPIs “EPI com Preço Baixo” com luvas, óculos, botinas, abafadores e capacetes, criado no Encarte Oferta",
    },
    glow: "#4C9A2A",
    meta: {
      title: "Encartes de ofertas para lojas de EPIs",
      description:
        "Transforme luvas, capacetes, botas, óculos e protetores em encartes profissionais e coloque seus equipamentos na frente de empresas e profissionais antes do pedido de cotação.",
    },
    eyebrow: "Para lojas de EPIs e equipamentos de segurança",
    headline: ["Seus EPIs", "na mão", "do comprador antes da cotação"],
    lead: "Sua loja tem luvas, capacetes, botas, óculos, protetores e dezenas de outros equipamentos. Mas se o cliente só descobre os produtos quando pede orçamento, muitas vendas passam direto. Com o Encarte Oferta, você transforma produtos, preços e condições comerciais em encartes profissionais, fáceis de consultar e de compartilhar.",
    pains: [
      {
        title: "Você só aparece quando pedem orçamento",
        body: "O comprador da empresa cota com quem lembra primeiro. Se a sua loja não está no radar, a cotação nem chega até você.",
      },
      {
        title: "Catálogo enorme, divulgação pequena",
        body: "São dezenas de modelos de luva, bota e protetor, mas o cliente conhece só o que vê no balcão.",
      },
      {
        title: "Lista de preço não convence",
        body: "Planilha e lista em texto no WhatsApp não mostram o produto. Quem cuida da segurança quer ver o equipamento antes de decidir.",
      },
    ],
    benefitsTitle: "Um catálogo que vende por você",
    benefits: [
      {
        icon: SquaresFour,
        title: "Um encarte para cada linha de proteção",
        body: "Monte encartes de 1 a 12 produtos para mãos, cabeça, pés ou trabalho em altura e envie a cada cliente o que ele mais compra.",
      },
      {
        icon: WhatsappLogo,
        title: "Pronto para o WhatsApp do comprador",
        body: "Baixe em alta resolução e envie para técnicos de segurança, compradores e empreiteiros.",
      },
      {
        icon: CreditCard,
        title: "Condições comerciais na arte",
        body: "Mostre parcelamento, preço “de / por” e as formas de pagamento aceitas, sem explicar tudo em cada conversa.",
      },
      {
        icon: UsersThree,
        title: "Equipe de vendas na mesma conta",
        body: "O administrador cria os usuários, e cada vendedor monta os encartes para os seus clientes.",
      },
    ],
    shift: {
      before: [
        "Cliente descobrindo o produto só ao pedir orçamento",
        "Lista em texto com códigos e preços",
        "Vendedor explicando as condições uma a uma",
      ],
      after: [
        "Seus equipamentos chegando antes da cotação",
        "Encarte visual, organizado e fácil de consultar",
        "Preços e condições claros na própria arte",
      ],
    },
    closing: {
      title: "Coloque seus EPIs na frente de quem compra antes do pedido de cotação",
      body: "Fale com a nossa equipe e monte o primeiro encarte de ofertas da sua loja ainda hoje.",
    },
    whatsappMessage: "Olá! Tenho uma loja de EPIs e quero conhecer o Encarte Oferta.",
  },
  {
    slug: "lojas-de-suplementos",
    label: "Lojas de suplementos",
    flyer: {
      src: "/estabilishments/loja-de-suplementos.webp",
      alt: "Encarte de loja de suplementos “Proteína em Promoção” com whey, creatina, pré-treino e glutamina, criado no Encarte Oferta",
    },
    glow: "#F28C00",
    meta: {
      title: "Encartes de ofertas para lojas de suplementos",
      description:
        "Divulgue whey, creatina, pré-treinos e vitaminas em encartes profissionais e vídeos para Reels, e leve suas promoções até quem já está buscando resultados.",
    },
    eyebrow: "Para lojas de suplementos e nutrição esportiva",
    headline: ["Whey, creatina e pré-treino em oferta,", "no feed", "de quem treina"],
    lead: "Você tem whey, creatina, pré-treino e vários outros produtos com bons preços. Mas se essas ofertas ficam só na prateleira ou em posts improvisados, muitos clientes nem sabem que elas existem. Com o Encarte Oferta, sua loja transforma produtos, preços e promoções em encartes e vídeos profissionais.",
    pains: [
      {
        title: "Oferta boa que ninguém vê",
        body: "Seu preço é competitivo, mas o cliente compra na loja on-line porque viu a promoção de lá primeiro.",
      },
      {
        title: "Post improvisado não passa confiança",
        body: "Quem investe em suplemento quer comprar de uma loja séria. Foto tremida com o preço digitado por cima não transmite isso.",
      },
      {
        title: "Seu público vive no Instagram",
        body: "Quem treina acompanha Reels e Stories todos os dias. Se a sua loja não aparece ali com frequência, ela é esquecida.",
      },
    ],
    benefitsTitle: "No ritmo do público fitness",
    benefits: [
      {
        icon: FilmSlate,
        title: "Vídeo narrado para Reels",
        body: "Transforme o encarte em vídeo com preços animados, narração em português e trilha sonora, no formato que o seu público assiste.",
      },
      {
        icon: Tag,
        title: "Desconto que salta aos olhos",
        body: "Preço “de / por” em destaque para mostrar a economia em cada pote.",
      },
      {
        icon: CalendarCheck,
        title: "Presença constante nas redes",
        body: "Agende as campanhas da semana de uma vez e mantenha a loja no feed sem parar o atendimento.",
      },
      {
        icon: MagicWand,
        title: "Visual de marca grande",
        body: "Mais de 300 temas prontos e temas gerados com IA para competir de igual para igual com as grandes lojas.",
      },
    ],
    shift: {
      before: [
        "Promoções esquecidas na prateleira",
        "Posts improvisados com foto do celular",
        "Loja sumida das redes por falta de tempo",
      ],
      after: [
        "Ofertas chegando a quem já procura suplemento",
        "Encartes e vídeos com visual profissional",
        "Campanhas agendadas para a semana inteira",
      ],
    },
    closing: {
      title: "Faça suas promoções chegarem a quem quer melhorar o treino e os resultados",
      body: "Fale com a nossa equipe e publique o primeiro encarte da sua loja de suplementos hoje.",
    },
    whatsappMessage: "Olá! Tenho uma loja de suplementos e quero conhecer o Encarte Oferta.",
  },
];

export function getSegmentPage(slug: string) {
  return SEGMENT_PAGES.find((s) => s.slug === slug);
}
