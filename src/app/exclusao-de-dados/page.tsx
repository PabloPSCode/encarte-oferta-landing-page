import type { Metadata } from "next";
import Link from "next/link";
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";
import { SITE, SUPPORT, whatsappLink } from "@/content/site";

export const metadata: Metadata = {
  title: "Exclusão de dados",
  description:
    "Como solicitar a exclusão dos seus dados do Encarte Oferta, inclusive os dados recebidos do Facebook e do Instagram, pelo WhatsApp do suporte.",
  alternates: { canonical: "/exclusao-de-dados" },
};

const DELETION_LINK = whatsappLink(
  "Olá! Quero solicitar a exclusão dos meus dados do Encarte Oferta.\n\nNome:\nE-mail cadastrado:\nEmpresa (CNPJ):\nO que deseja excluir (conta inteira ou apenas a conexão com Facebook/Instagram):"
);

const WhatsappButton = () => (
  <a
    href={DELETION_LINK}
    target="_blank"
    rel="noopener noreferrer"
    className="mt-5 inline-flex items-center gap-2.5 rounded-[13px] bg-[#25D366] px-6 py-3.5 text-[15px] font-extrabold !text-white no-underline! shadow-[0_8px_20px_rgba(37,211,102,0.35)] transition-all hover:brightness-105"
  >
    <WhatsappLogo size={22} weight="fill" />
    Solicitar exclusão pelo WhatsApp
  </a>
);

const sections: LegalSection[] = [
  {
    id: "como-solicitar",
    title: "Como solicitar a exclusão",
    content: (
      <>
        <p>
          A exclusão dos seus dados é feita pelo nosso suporte no WhatsApp <strong>{SUPPORT.whatsappLabel}</strong>. Siga os
          passos:
        </p>
        <ol className="list">
          <li>
            Toque no botão abaixo ou envie uma mensagem para o WhatsApp <strong>{SUPPORT.whatsappLabel}</strong>.
          </li>
          <li>
            Informe <strong>seu nome</strong>, o <strong>e-mail cadastrado</strong> na plataforma e o{" "}
            <strong>CNPJ da empresa</strong>.
          </li>
          <li>
            Diga o que deseja excluir: a <strong>conta inteira</strong> (seus dados de usuário e, se você for o
            administrador, os dados da empresa) ou <strong>apenas a conexão</strong> com o Facebook e o Instagram.
          </li>
          <li>
            Para sua segurança, vamos confirmar que o pedido foi feito pelo titular da conta. Podemos pedir que você
            confirme a solicitação pelo e-mail cadastrado.
          </li>
          <li>Você receberá a confirmação quando a exclusão for concluída.</li>
        </ol>
        <WhatsappButton />
        <p>
          Atendimento de {SUPPORT.whatsappHours.toLowerCase()}. Se preferir, envie o pedido para o e-mail{" "}
          <a href={`mailto:${SUPPORT.email}?subject=${encodeURIComponent("Solicitação de exclusão de dados")}`}>
            {SUPPORT.email}
          </a>{" "}
          a partir do e-mail cadastrado.
        </p>
      </>
    ),
  },
  {
    id: "o-que-e-excluido",
    title: "O que é excluído",
    content: (
      <>
        <h3>Exclusão da conta</h3>
        <ul>
          <li>Seus dados de usuário: nome, e-mail, WhatsApp, CPF, senha e foto de perfil;</li>
          <li>
            Se você for o administrador e pedir o encerramento da empresa: os dados da empresa, a configuração do encarte
            (logo, slogan, cores, contatos, endereço e redes sociais), os produtos personalizados e suas fotos, os
            encartes, os temas gerados com IA, os vídeos e os agendamentos;
          </li>
          <li>As conexões com Facebook e Instagram e os tokens de acesso correspondentes.</li>
        </ul>
        <h3>Exclusão apenas da conexão com Facebook e Instagram</h3>
        <p>
          Eliminamos o identificador e o nome da página ou do perfil, o nome de usuário do Instagram, as permissões
          concedidas e os tokens de acesso. Sua conta no {SITE.name} continua ativa, e os agendamentos que dependem dessa
          conexão deixam de ser publicados.
        </p>
      </>
    ),
  },
  {
    id: "desconectar-sozinho",
    title: "Desconectar o Facebook e o Instagram por conta própria",
    content: (
      <>
        <p>Você também pode interromper o acesso a qualquer momento, sem falar com o suporte:</p>
        <ul>
          <li>
            <strong>Na plataforma</strong>: acesse <em>Configurações → Conexões</em> e desconecte a conta.
          </li>
          <li>
            <strong>No Facebook</strong>: acesse <em>Configurações e privacidade → Configurações → Apps e sites</em>, localize o{" "}
            {SITE.name} e clique em <em>Remover</em>.
          </li>
        </ul>
        <p>
          Com isso, deixamos de acessar suas páginas e contas. Para que os dados da conexão também sejam eliminados dos
          nossos sistemas, faça a solicitação pelo WhatsApp, conforme a seção 1.
        </p>
      </>
    ),
  },
  {
    id: "prazo",
    title: "Prazo",
    content: (
      <p>
        Confirmamos o recebimento do pedido no atendimento e concluímos a exclusão em até <strong>15 dias</strong>. Você
        será avisado pelo mesmo canal quando ela for concluída.
      </p>
    ),
  },
  {
    id: "o-que-pode-ser-mantido",
    title: "O que pode ser mantido",
    content: (
      <>
        <p>
          Alguns dados podem ser mantidos mesmo após a exclusão, apenas pelo tempo e para as finalidades permitidas pelo
          art. 16 da Lei Geral de Proteção de Dados (Lei nº 13.709/2018):
        </p>
        <ul>
          <li>
            Registros de acesso à plataforma, pelo prazo de 6 meses exigido pelo Marco Civil da Internet (Lei nº
            12.965/2014, art. 15);
          </li>
          <li>Informações necessárias ao cumprimento de obrigações legais, fiscais ou regulatórias;</li>
          <li>Informações necessárias ao exercício de direitos em processos judiciais ou administrativos.</li>
        </ul>
        <p>Encerrados esses prazos, os dados são eliminados.</p>
        <p>
          Encartes e vídeos que você já publicou nas suas redes sociais ou compartilhou continuam nesses canais. Remova-os
          diretamente no Facebook, no Instagram ou no WhatsApp, se desejar.
        </p>
      </>
    ),
  },
  {
    id: "mais-informacoes",
    title: "Mais informações",
    content: (
      <p>
        Para saber quais dados tratamos, com quem compartilhamos e quais são os seus direitos, leia a nossa{" "}
        <Link href="/politica-de-privacidade">Política de Privacidade</Link>.
      </p>
    ),
  },
];

export default function DataDeletionPage() {
  return (
    <LegalPage
      eyebrow="Privacidade e LGPD"
      title="Exclusão de dados"
      related={{ href: "/politica-de-privacidade", label: "Política de Privacidade" }}
      intro={
        <p>
          Você pode pedir a qualquer momento a exclusão dos seus dados do {SITE.name}, inclusive dos dados recebidos do
          Facebook e do Instagram quando você conectou suas contas. Veja abaixo como fazer.
        </p>
      }
      sections={sections}
    />
  );
}
