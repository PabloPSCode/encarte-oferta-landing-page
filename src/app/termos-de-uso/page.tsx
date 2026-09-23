import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";
import { COMPANY, SITE, SUPPORT } from "@/content/site";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description:
    "Regras de uso da plataforma Encarte Oferta: cadastro, planos e créditos, conteúdo, integrações com redes sociais, responsabilidades e cancelamento.",
  alternates: { canonical: "/termos-de-uso" },
};

const Email = () => <a href={`mailto:${SUPPORT.email}`}>{SUPPORT.email}</a>;

const operatorId = [COMPANY.legalName, COMPANY.cnpj && `inscrita no CNPJ sob o nº ${COMPANY.cnpj}`, COMPANY.address && `com sede em ${COMPANY.address}`]
  .filter(Boolean)
  .join(", ");

const forum = COMPANY.forum ? `da comarca de ${COMPANY.forum}` : `da comarca da sede de ${COMPANY.legalName}`;

const sections: LegalSection[] = [
  {
    id: "aceitacao",
    title: "Aceitação dos Termos",
    content: (
      <>
        <p>
          Estes Termos de Uso regulam o acesso e o uso da plataforma {SITE.name}, operada por <strong>{operatorId}</strong>{" "}
          (“nós”). Ao contratar um plano, acessar ou usar a plataforma, a empresa cliente e cada usuário cadastrado declaram
          que leram, entenderam e concordam com estes Termos e com a{" "}
          <Link href="/politica-de-privacidade">Política de Privacidade</Link>.
        </p>
        <p>Se você não concordar com alguma condição, não utilize a plataforma.</p>
      </>
    ),
  },
  {
    id: "definicoes",
    title: "Definições",
    content: (
      <ul>
        <li>
          <strong>Plataforma</strong>: o sistema {SITE.name}, acessado pelo navegador no computador, tablet ou celular.
        </li>
        <li>
          <strong>Cliente</strong>: a empresa (pessoa jurídica com CNPJ ativo) que contrata um plano.
        </li>
        <li>
          <strong>Administrador</strong>: o usuário responsável pela conta do Cliente. Cada empresa tem um único
          administrador.
        </li>
        <li>
          <strong>Usuário</strong>: pessoa cadastrada pelo Administrador para usar a plataforma em nome do Cliente.
        </li>
        <li>
          <strong>Encarte</strong>: a peça de divulgação de ofertas criada na plataforma, nos formatos feed (1080×1350) ou
          stories (1080×1920), com uma ou mais páginas.
        </li>
        <li>
          <strong>Tema</strong>: a arte de fundo do encarte. Pode ser global (disponível a todos os clientes) ou gerado com
          inteligência artificial sob medida para o Cliente.
        </li>
        <li>
          <strong>Créditos</strong>: a cota mensal de gerações de encartes, temas com IA e vídeos com IA prevista no plano.
        </li>
        <li>
          <strong>Conteúdo do Cliente</strong>: logos, fotos, textos, preços, produtos personalizados e demais informações
          inseridas pelo Cliente ou por seus Usuários.
        </li>
      </ul>
    ),
  },
  {
    id: "servico",
    title: "O que a plataforma oferece",
    content: (
      <>
        <p>A plataforma permite ao Cliente, conforme o plano contratado:</p>
        <ul>
          <li>Criar encartes a partir de temas globais ou gerados com IA, em quatro etapas: temas, produtos, personalização e publicação;</li>
          <li>
            Usar o catálogo compartilhado de produtos (com foto, EAN e unidade) e cadastrar produtos personalizados, com
            remoção automática do fundo das fotos;
          </li>
          <li>Aplicar a identidade da loja (logo, slogan, cores, contatos, endereço, redes sociais e formas de pagamento);</li>
          <li>Gerar vídeos a partir dos encartes, com animação, trilha sonora e narração em português;</li>
          <li>Baixar as imagens em PNG, baixar os vídeos e compartilhá-los, inclusive pelo WhatsApp;</li>
          <li>Conectar contas do Instagram e do Facebook e agendar publicações no feed, nos stories ou nos reels;</li>
          <li>Cadastrar outros usuários da equipe.</li>
        </ul>
        <p>
          Podemos incluir, alterar ou descontinuar funcionalidades para melhorar o serviço. Mudanças que reduzam de forma
          relevante o que foi contratado serão comunicadas com antecedência.
        </p>
      </>
    ),
  },
  {
    id: "cadastro",
    title: "Cadastro, contas e acesso",
    content: (
      <>
        <ul>
          <li>
            O cadastro é feito para empresas com <strong>CNPJ válido e ativo</strong> na Receita Federal. Cada CNPJ
            corresponde a uma única empresa na plataforma.
          </li>
          <li>
            O <strong>ramo de atividade</strong> informado no cadastro define as categorias de produtos e os temas
            disponíveis e <strong>não pode ser alterado</strong> depois.
          </li>
          <li>
            O Administrador cria os Usuários, que precisam de um e-mail ainda não usado na plataforma e de um CPF válido.
            O Administrador deve ter autorização para cadastrar esses dados e informar os colaboradores sobre o tratamento.
          </li>
          <li>Usuários devem ser maiores de 18 anos e ter poderes para agir em nome do Cliente.</li>
          <li>
            As informações do cadastro devem ser verdadeiras e mantidas atualizadas. O Cliente responde pelos atos
            praticados com os acessos da sua conta.
          </li>
          <li>
            O login e a senha (com no mínimo 8 caracteres) são pessoais e intransferíveis. Em caso de suspeita de uso
            indevido, altere a senha e avise o suporte imediatamente.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "planos-creditos",
    title: "Planos, créditos e pagamento",
    content: (
      <>
        <p>
          A plataforma é oferecida nos planos <strong>Start</strong>, <strong>Avançado</strong> e{" "}
          <strong>Profissional</strong>, com cobrança mensal ou anual. Os valores, as cotas de créditos, o número de contas
          conectadas e a forma de pagamento são informados ao Cliente no momento da contratação.
        </p>
        <h3>5.1. Como os créditos funcionam</h3>
        <ul>
          <li>
            Cada encarte criado, cada tema gerado com IA (feed e stories juntos) e cada vídeo gerado consome{" "}
            <strong>1 crédito</strong> da respectiva cota. Gerar um tema novamente consome um novo crédito.
          </li>
          <li>Se uma geração falhar, o crédito é devolvido automaticamente.</li>
          <li>
            Os créditos são renovados <strong>todo dia 1º, à 00h (horário de Brasília)</strong>, de acordo com o plano. O
            saldo não utilizado <strong>não acumula</strong> para o mês seguinte.
          </li>
          <li>
            Quando uma cota se esgota, somente a ação correspondente fica bloqueada até a próxima renovação ou até a troca
            de plano. As demais funcionalidades continuam disponíveis.
          </li>
          <li>
            Na troca de plano durante o mês, a cota do novo plano é somada ao saldo atual, e os créditos já utilizados
            permanecem contabilizados.
          </li>
          <li>Créditos não são convertidos em dinheiro nem transferidos para outra empresa.</li>
        </ul>
        <h3>5.2. Pagamento e reajuste</h3>
        <p>
          O Cliente se compromete a pagar o valor do plano nas datas combinadas. O atraso pode levar à suspensão do acesso
          até a regularização. Os valores podem ser reajustados, com aviso prévio de pelo menos 30 dias, e o novo valor só
          se aplica a partir do ciclo seguinte ao aviso.
        </p>
      </>
    ),
  },
  {
    id: "cancelamento",
    title: "Cancelamento e troca de plano",
    content: (
      <>
        <ul>
          <li>
            O Cliente pode solicitar o cancelamento ou a troca de plano a qualquer momento pelo WhatsApp {SUPPORT.whatsappLabel} ou
            pelo e-mail <Email />.
          </li>
          <li>
            No cancelamento, o acesso permanece até o fim do ciclo já pago e não há cobrança de multa. Não há devolução
            proporcional de períodos já iniciados, salvo quando exigido por lei ou acordado por escrito.
          </li>
          <li>
            Quando aplicável, fica assegurado o direito de arrependimento em até 7 dias da contratação, previsto no art. 49
            do Código de Defesa do Consumidor.
          </li>
          <li>
            Após o encerramento, o Cliente pode solicitar a exportação ou a eliminação dos seus dados, conforme a{" "}
            <Link href="/politica-de-privacidade">Política de Privacidade</Link>. Recomendamos baixar antes os encartes e
            vídeos que desejar guardar.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "uso-aceitavel",
    title: "Uso permitido e condutas proibidas",
    content: (
      <>
        <p>A plataforma deve ser usada apenas para divulgar legitimamente os produtos e as ofertas do Cliente. É proibido:</p>
        <ul>
          <li>Divulgar ofertas enganosas ou abusivas, preços que não serão praticados ou produtos indisponíveis;</li>
          <li>
            Anunciar produtos ilícitos ou cuja divulgação seja proibida ou restrita, sem observar as regras aplicáveis;
          </li>
          <li>
            Inserir conteúdo ofensivo, discriminatório, violento, sexual, difamatório ou que viole direitos de terceiros,
            inclusive de marca, imagem e direitos autorais;
          </li>
          <li>Usar dados pessoais de terceiros sem base legal;</li>
          <li>
            Contornar os limites de créditos, acessar áreas ou dados de outras empresas, explorar falhas de segurança ou
            sobrecarregar a plataforma;
          </li>
          <li>
            Copiar, revender, fazer engenharia reversa ou extrair de forma automatizada o catálogo, os temas ou qualquer
            parte da plataforma;
          </li>
          <li>Compartilhar o acesso com pessoas que não façam parte da equipe do Cliente.</li>
        </ul>
        <p>
          O descumprimento pode levar à remoção do conteúdo, à suspensão ou ao encerramento da conta, sem prejuízo de outras
          medidas cabíveis.
        </p>
      </>
    ),
  },
  {
    id: "responsabilidade-ofertas",
    title: "Responsabilidade pelas ofertas publicadas",
    content: (
      <>
        <p>
          O Cliente é o <strong>único responsável</strong> pelas ofertas que divulga: preços, preços promocionais,
          parcelamento, prazos de validade, disponibilidade em estoque, descrição dos produtos e condições de pagamento
          informadas nos encartes e vídeos. Cabe ao Cliente cumprir o Código de Defesa do Consumidor e as demais normas
          de publicidade e precificação.
        </p>
        <p>
          <strong>Revise sempre o encarte e o vídeo antes de publicar.</strong> Os preços médios exibidos no catálogo são
          apenas referência e não vinculam o Cliente.
        </p>
      </>
    ),
  },
  {
    id: "conteudo",
    title: "Conteúdo do Cliente e licença de uso",
    content: (
      <>
        <p>
          O Cliente continua titular do Conteúdo do Cliente e garante que tem os direitos necessários sobre logos, fotos,
          marcas e textos que insere na plataforma.
        </p>
        <p>
          Para prestar o serviço, o Cliente nos concede uma licença não exclusiva, gratuita e limitada ao período do
          contrato para armazenar, processar, remover o fundo de imagens, compor artes, renderizar vídeos e enviar esse
          conteúdo aos fornecedores e às redes sociais indicados pelo Cliente.
        </p>
        <p>
          Os encartes e vídeos gerados podem ser usados livremente pelo Cliente para divulgar o próprio negócio, inclusive
          depois do fim do contrato.
        </p>
      </>
    ),
  },
  {
    id: "catalogo-ia",
    title: "Catálogo, temas e conteúdo gerado por IA",
    content: (
      <>
        <ul>
          <li>
            O catálogo compartilhado reúne produtos com foto, nome, EAN e unidade para facilitar a montagem dos encartes.
            As marcas e os produtos pertencem aos respectivos titulares. O Cliente deve conferir se as informações
            correspondem ao produto que vende e pode ajustar o nome do produto no encarte.
          </li>
          <li>
            Os temas globais e as trilhas sonoras são licenciados para uso dentro da plataforma e nas peças geradas por
            ela, e não podem ser extraídos para outros fins.
          </li>
          <li>
            Temas gerados com IA são criados a partir do título, das cores e da categoria informados, ficam disponíveis
            apenas para a empresa que os gerou e podem apresentar imperfeições. A narração dos vídeos também é gerada
            automaticamente. Cabe ao Cliente revisar o resultado antes de publicar.
          </li>
          <li>
            A remoção automática de fundo pode não funcionar em todas as fotos. Nesse caso, o produto é salvo com a foto
            original.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "redes-sociais",
    title: "Integrações com redes sociais",
    content: (
      <>
        <p>
          A conexão com Instagram e Facebook é opcional e depende de autorização feita pelo Cliente na página da própria
          Meta. O número de contas conectadas é limitado pelo plano. O uso dessas redes está sujeito aos termos e às
          políticas da Meta, que o Cliente também deve cumprir.
        </p>
        <p>
          As publicações agendadas dependem da disponibilidade das redes sociais, da validade da autorização concedida e das
          regras de cada plataforma. Não nos responsabilizamos por publicações recusadas, removidas ou limitadas pelas redes
          sociais, nem por instabilidades nesses serviços. Um canal que falhar pode ser tentado novamente. Agendamentos
          podem ser cancelados antes da publicação, mas não editados.
        </p>
      </>
    ),
  },
  {
    id: "disponibilidade",
    title: "Disponibilidade e suporte",
    content: (
      <>
        <p>
          Trabalhamos para manter a plataforma disponível e funcionando corretamente, mas ela pode passar por manutenções,
          atualizações ou interrupções causadas por terceiros, como provedores de nuvem, de IA e redes sociais. Sempre que
          possível, manutenções programadas serão avisadas.
        </p>
        <p>
          O suporte é prestado pelo WhatsApp {SUPPORT.whatsappLabel} ({SUPPORT.whatsappHours.toLowerCase()}) e pelo e-mail{" "}
          <Email /> ({SUPPORT.emailHours.toLowerCase()}).
        </p>
      </>
    ),
  },
  {
    id: "propriedade-intelectual",
    title: "Propriedade intelectual da plataforma",
    content: (
      <p>
        A marca {SITE.name}, o software, o design da interface, os layouts, os temas globais e os demais elementos da
        plataforma pertencem a {COMPANY.legalName} ou a seus licenciantes. Estes Termos não transferem ao Cliente nenhum
        direito sobre eles além do uso da plataforma durante a vigência do plano.
      </p>
    ),
  },
  {
    id: "limitacao",
    title: "Limitação de responsabilidade",
    content: (
      <>
        <p>Na máxima extensão permitida pela lei, não respondemos por:</p>
        <ul>
          <li>Conteúdo, preços e ofertas inseridos ou publicados pelo Cliente;</li>
          <li>Decisões comerciais tomadas com base na plataforma, lucros cessantes ou perda de vendas;</li>
          <li>Falhas ou mudanças de serviços de terceiros, como redes sociais, provedores de IA e de internet;</li>
          <li>Uso indevido da conta decorrente de falha do Cliente na guarda de suas credenciais.</li>
        </ul>
        <p>
          Quando houver responsabilidade nossa, ela ficará limitada ao valor pago pelo Cliente nos 12 meses anteriores ao
          fato, salvo nos casos de dolo ou em que a lei não permita essa limitação.
        </p>
      </>
    ),
  },
  {
    id: "suspensao",
    title: "Suspensão e encerramento",
    content: (
      <p>
        Podemos suspender ou encerrar o acesso do Cliente em caso de falta de pagamento, violação destes Termos, uso
        fraudulento ou determinação legal. Sempre que possível, o Cliente será avisado antes e terá a oportunidade de
        regularizar a situação.
      </p>
    ),
  },
  {
    id: "privacidade",
    title: "Privacidade e proteção de dados",
    content: (
      <p>
        O tratamento de dados pessoais na plataforma segue a Lei nº 13.709/2018 (LGPD) e está descrito na{" "}
        <Link href="/politica-de-privacidade">Política de Privacidade</Link>, que faz parte destes Termos.
      </p>
    ),
  },
  {
    id: "alteracoes",
    title: "Alterações destes Termos",
    content: (
      <p>
        Estes Termos podem ser atualizados. A data da última atualização fica no topo da página e mudanças relevantes serão
        comunicadas pelos canais cadastrados ou dentro da plataforma. O uso continuado depois da vigência da nova versão
        indica concordância. Se o Cliente não concordar, pode cancelar o plano nos termos da seção de cancelamento.
      </p>
    ),
  },
  {
    id: "lei-foro",
    title: "Lei aplicável e foro",
    content: (
      <p>
        Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro {forum} para resolver
        eventuais controvérsias, ressalvado o direito do consumidor de propor ação no foro do seu domicílio, quando
        aplicável.
      </p>
    ),
  },
  {
    id: "contato",
    title: "Contato",
    content: (
      <ul>
        <li>
          E-mail: <Email />
        </li>
        <li>
          WhatsApp: {SUPPORT.whatsappLabel} ({SUPPORT.whatsappHours.toLowerCase()})
        </li>
      </ul>
    ),
  },
];

export default function TermsOfUsePage() {
  return (
    <LegalPage
      eyebrow="Documento legal"
      title="Termos de Uso"
      related={{ href: "/politica-de-privacidade", label: "Política de Privacidade" }}
      intro={
        <p>
          Estes Termos explicam as regras para usar o {SITE.name}: como funciona o cadastro, os planos e os créditos, o que
          é permitido publicar, as responsabilidades de cada parte e como cancelar.
        </p>
      }
      sections={sections}
    />
  );
}
