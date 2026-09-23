import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";
import { COMPANY, SITE, SUPPORT } from "@/content/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como o Encarte Oferta coleta, usa, compartilha, armazena e protege dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).",
  alternates: { canonical: "/politica-de-privacidade" },
};

const Email = () => <a href={`mailto:${SUPPORT.email}`}>{SUPPORT.email}</a>;

const controllerId = [COMPANY.legalName, COMPANY.cnpj && `inscrita no CNPJ sob o nº ${COMPANY.cnpj}`, COMPANY.address && `com sede em ${COMPANY.address}`]
  .filter(Boolean)
  .join(", ");

const sections: LegalSection[] = [
  {
    id: "controlador",
    title: "Quem é o controlador dos dados",
    content: (
      <>
        <p>
          O {SITE.name} é operado por <strong>{controllerId}</strong> (“nós”), que atua como <strong>controladora</strong> dos
          dados pessoais tratados para o funcionamento da plataforma, nos termos da Lei nº 13.709/2018 (Lei Geral de
          Proteção de Dados Pessoais, “LGPD”).
        </p>
        <p>
          Para qualquer assunto relacionado a esta Política ou aos seus dados pessoais, inclusive para falar com o
          encarregado pelo tratamento de dados pessoais, utilize o canal <Email />.
        </p>
      </>
    ),
  },
  {
    id: "abrangencia",
    title: "A quem esta Política se aplica",
    content: (
      <>
        <p>Esta Política se aplica ao tratamento de dados pessoais de:</p>
        <ul>
          <li>
            <strong>Usuários da plataforma</strong>: o administrador e os demais usuários cadastrados por uma empresa cliente;
          </li>
          <li>
            <strong>Representantes das empresas clientes</strong>, cujos dados de contato constam no cadastro da empresa;
          </li>
          <li>
            <strong>Visitantes</strong> deste site e pessoas que entram em contato conosco pelo WhatsApp ou por e-mail.
          </li>
        </ul>
        <p>
          O {SITE.name} é uma ferramenta voltada a empresas (pessoas jurídicas com CNPJ ativo). Os dados que a própria
          empresa cliente insere nos encartes, como preços, produtos, endereço e contatos da loja, são informações
          comerciais da empresa.
        </p>
      </>
    ),
  },
  {
    id: "dados-coletados",
    title: "Quais dados coletamos",
    content: (
      <>
        <h3>3.1. Cadastro da empresa</h3>
        <p>
          Razão social, nome fantasia, CNPJ, e-mail, WhatsApp, endereço (logradouro, número, bairro, cidade e UF) e ramo
          de atividade. O CNPJ é validado e consultado em bases públicas para confirmar que está ativo na Receita Federal.
        </p>

        <h3>3.2. Cadastro dos usuários</h3>
        <ul>
          <li>Nome, e-mail, WhatsApp e CPF;</li>
          <li>
            Senha, que <strong>nunca é armazenada em texto aberto</strong>: guardamos apenas o seu resumo criptográfico
            (hash);
          </li>
          <li>Foto de perfil, se você optar por enviar uma;</li>
          <li>Perfil de acesso (administrador ou usuário) e a empresa à qual o usuário pertence.</li>
        </ul>

        <h3>3.3. Configuração do encarte e conteúdo</h3>
        <ul>
          <li>
            Logo, slogan, cores, telefone, legenda do telefone, WhatsApp, endereço, site, perfis de Facebook, Instagram e
            TikTok e formas de pagamento aceitas, exibidos no rodapé dos encartes e dos vídeos;
          </li>
          <li>Produtos personalizados e suas fotos, encartes, temas, vídeos, legendas de publicação e agendamentos.</li>
        </ul>

        <h3>3.4. Conexões com redes sociais</h3>
        <p>
          Quando você conecta uma conta do Facebook ou do Instagram, recebemos da Meta o identificador e o nome da página
          ou do perfil, o nome de usuário do Instagram, as permissões concedidas e os tokens de acesso necessários para
          publicar em seu nome. <strong>Não temos acesso à sua senha dessas redes.</strong>
        </p>

        <h3>3.5. Dados técnicos e de uso</h3>
        <ul>
          <li>
            Registros técnicos das requisições feitas à plataforma (data e hora, método, rota acessada, resultado e tempo de
            resposta);
          </li>
          <li>Histórico de consumo de créditos do plano;</li>
          <li>Códigos de recuperação de senha solicitados.</li>
        </ul>

        <h3>3.6. Atendimento</h3>
        <p>As mensagens e informações que você nos envia pelo WhatsApp ou por e-mail.</p>

        <div className="callout">
          <p>
            <strong>Não coletamos dados de cartão de crédito</strong> dentro da plataforma. Também não usamos este site para
            coletar dados sensíveis (art. 5º, II, da LGPD).
          </p>
        </div>
      </>
    ),
  },
  {
    id: "finalidades",
    title: "Para que usamos os dados e com qual base legal",
    content: (
      <table>
        <thead>
          <tr>
            <th>Finalidade</th>
            <th>Base legal (LGPD)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Criar e manter a conta da empresa e dos usuários, autenticar o acesso e controlar permissões</td>
            <td>Execução de contrato (art. 7º, V)</td>
          </tr>
          <tr>
            <td>Gerar encartes, temas com IA, vídeos narrados e aplicar a identidade da loja nas artes</td>
            <td>Execução de contrato (art. 7º, V)</td>
          </tr>
          <tr>
            <td>Publicar e agendar conteúdo nas contas de redes sociais que você conectar</td>
            <td>Execução de contrato, a seu pedido (art. 7º, V)</td>
          </tr>
          <tr>
            <td>Validar o CNPJ e identificar os usuários pelo CPF, prevenindo cadastros indevidos e fraudes</td>
            <td>Legítimo interesse (art. 7º, IX) e execução de contrato (art. 7º, V)</td>
          </tr>
          <tr>
            <td>Controlar os créditos mensais do plano</td>
            <td>Execução de contrato (art. 7º, V)</td>
          </tr>
          <tr>
            <td>Enviar e-mails de serviço, como o código de recuperação de senha</td>
            <td>Execução de contrato (art. 7º, V)</td>
          </tr>
          <tr>
            <td>Prestar suporte e responder às suas solicitações</td>
            <td>Execução de contrato (art. 7º, V) e legítimo interesse (art. 7º, IX)</td>
          </tr>
          <tr>
            <td>Manter registros técnicos, garantir a segurança e investigar falhas</td>
            <td>Cumprimento de obrigação legal (art. 7º, II; Marco Civil da Internet, art. 15) e legítimo interesse (art. 7º, IX)</td>
          </tr>
          <tr>
            <td>Defender nossos direitos em processos judiciais, administrativos ou arbitrais</td>
            <td>Exercício regular de direitos (art. 7º, VI)</td>
          </tr>
        </tbody>
      </table>
    ),
  },
  {
    id: "compartilhamento",
    title: "Com quem compartilhamos",
    content: (
      <>
        <p>
          <strong>Não vendemos dados pessoais.</strong> Compartilhamos apenas o necessário com fornecedores que nos ajudam a
          prestar o serviço, na qualidade de operadores ou de controladores independentes:
        </p>
        <table>
          <thead>
            <tr>
              <th>Fornecedor</th>
              <th>Para quê</th>
              <th>O que recebe</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cloudflare (R2)</td>
              <td>Armazenamento de imagens e vídeos</td>
              <td>Logos, fotos de perfil e de produtos, encartes, temas e vídeos gerados</td>
            </tr>
            <tr>
              <td>OpenAI</td>
              <td>Geração de temas com IA</td>
              <td>Título do tema, cores, categoria e ramo de atividade. Nenhum dado pessoal é enviado.</td>
            </tr>
            <tr>
              <td>ElevenLabs</td>
              <td>Narração dos vídeos em português</td>
              <td>Nomes, preços e parcelamento dos produtos e, quando exibidos no encarte, slogan e endereço da loja</td>
            </tr>
            <tr>
              <td>Oracle Cloud (região São Paulo)</td>
              <td>Renderização dos vídeos</td>
              <td>Dados do encarte, incluindo produtos, preços, dados do rodapé e logo</td>
            </tr>
            <tr>
              <td>Meta Platforms (Facebook e Instagram)</td>
              <td>Publicação e agendamento, quando você conecta uma conta</td>
              <td>A mídia, a legenda e o canal escolhidos para cada publicação</td>
            </tr>
            <tr>
              <td>ReceitaWS e BrasilAPI</td>
              <td>Consulta e validação do CNPJ</td>
              <td>O número do CNPJ informado no cadastro</td>
            </tr>
            <tr>
              <td>Resend</td>
              <td>Envio de e-mails de serviço</td>
              <td>Nome e e-mail do destinatário e o conteúdo da mensagem</td>
            </tr>
          </tbody>
        </table>
        <p>
          Também usamos provedores de infraestrutura (hospedagem, banco de dados e filas de processamento) que armazenam
          os dados em nosso nome. Poderemos compartilhar dados com autoridades públicas quando houver obrigação legal ou
          ordem judicial, e com eventual sucessor em caso de reorganização societária, mantidas as garantias desta
          Política.
        </p>
      </>
    ),
  },
  {
    id: "transferencia-internacional",
    title: "Transferência internacional",
    content: (
      <p>
        Alguns fornecedores listados acima, como OpenAI, ElevenLabs, Cloudflare, Resend e Meta, podem processar dados em
        servidores fora do Brasil. Nesses casos, a transferência ocorre para a execução do contrato com você e com base
        nos mecanismos previstos no art. 33 da LGPD, como cláusulas contratuais e garantias de proteção oferecidas por
        esses fornecedores.
      </p>
    ),
  },
  {
    id: "arquivos-publicos",
    title: "Imagens e vídeos acessíveis por link",
    content: (
      <>
        <div className="callout">
          <p>
            Para que possam ser publicados nas redes sociais e exibidos no navegador, os arquivos de imagem e vídeo da
            plataforma (logos, fotos de perfil e de produtos, encartes, temas e vídeos) ficam hospedados em{" "}
            <strong>endereços públicos</strong>: qualquer pessoa que tenha o link exato consegue abri-los.
          </p>
        </div>
        <p>
          Os links não são divulgados por nós nem listados publicamente, mas recomendamos que você não envie para a
          plataforma imagens com informações confidenciais ou dados pessoais de terceiros. Os encartes são peças de
          divulgação, feitas para serem vistas pelo público.
        </p>
      </>
    ),
  },
  {
    id: "retencao",
    title: "Por quanto tempo guardamos os dados",
    content: (
      <>
        <ul>
          <li>
            <strong>Dados da conta e conteúdo</strong>: enquanto a empresa cliente mantiver a conta ativa.
          </li>
          <li>
            <strong>Exclusões feitas na plataforma</strong>: quando você exclui um usuário, produto, encarte, tema, vídeo ou
            conexão, o registro é desativado e deixa de aparecer imediatamente. Ele pode ser mantido por um período para
            permitir a recuperação de exclusões acidentais, a pedido, e para as finalidades do art. 16 da LGPD.
          </li>
          <li>
            <strong>Eliminação definitiva</strong>: pode ser solicitada a qualquer momento pelo canal <Email />, e será
            realizada ressalvadas as hipóteses legais de conservação.
          </li>
          <li>
            <strong>Registros de acesso</strong>: mantidos pelo prazo mínimo de 6 meses exigido pelo Marco Civil da Internet
            (Lei nº 12.965/2014, art. 15).
          </li>
          <li>
            <strong>Códigos de recuperação de senha</strong>: valem por 10 minutos e só podem ser usados uma vez.
          </li>
          <li>
            <strong>Sessões</strong>: o acesso à plataforma expira em 15 dias, e depois disso é preciso fazer login de novo.
          </li>
          <li>
            <strong>Dados necessários ao cumprimento de obrigações legais ou à defesa de direitos</strong>: pelo prazo
            prescricional ou legal aplicável.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "redes-sociais",
    title: "Conexões com Facebook e Instagram",
    content: (
      <>
        <p>
          A conexão é opcional e só é necessária para agendar publicações. Ao conectar, você autoriza, na página da própria
          Meta, as permissões usadas para listar suas páginas e contas comerciais e publicar conteúdo nelas. Usamos esse
          acesso <strong>apenas para publicar o que você agendar</strong> na plataforma.
        </p>
        <p>
          Os tokens de acesso são armazenados de forma criptografada (AES-256-GCM). Você pode desconectar uma conta a
          qualquer momento em <em>Configurações → Conexões</em> ou remover o aplicativo nas configurações da sua conta do
          Facebook. Nos dois casos a conexão deixa de ser usada. Para solicitar a eliminação dos dados da conexão, escreva
          para <Email />.
        </p>
        <p>O uso dessas redes também está sujeito aos termos e à política de privacidade da Meta.</p>
      </>
    ),
  },
  {
    id: "seguranca",
    title: "Como protegemos os dados",
    content: (
      <>
        <p>Adotamos medidas técnicas e administrativas compatíveis com a natureza dos dados tratados, entre elas:</p>
        <ul>
          <li>Senhas armazenadas apenas como hash criptográfico;</li>
          <li>Tokens de redes sociais criptografados;</li>
          <li>Comunicação protegida por HTTPS e cabeçalhos de segurança;</li>
          <li>Controle de acesso por perfil (administrador e usuário);</li>
          <li>Expiração das sessões e dos códigos de recuperação de senha.</li>
        </ul>
        <p>
          Nenhum sistema é totalmente imune a incidentes. Se ocorrer um incidente de segurança que possa acarretar risco
          ou dano relevante, comunicaremos os titulares afetados e a Autoridade Nacional de Proteção de Dados (ANPD), nos
          termos do art. 48 da LGPD. Você também é responsável por manter sua senha em sigilo e não compartilhar seu
          acesso.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies e armazenamento local",
    content: (
      <>
        <p>
          Este site não utiliza cookies de publicidade nem ferramentas de rastreamento de terceiros. A plataforma usa o{" "}
          <strong>armazenamento local do navegador</strong> (localStorage) para:
        </p>
        <ul>
          <li>Manter você conectado durante a sessão;</li>
          <li>Guardar o rascunho do encarte em edição;</li>
          <li>Lembrar preferências de interface, como o tema claro ou escuro e o menu recolhido.</li>
        </ul>
        <p>
          Esses dados ficam no seu dispositivo e são essenciais ao funcionamento do serviço. Você pode apagá-los limpando os
          dados de navegação, o que encerrará sua sessão.
        </p>
      </>
    ),
  },
  {
    id: "direitos",
    title: "Seus direitos como titular",
    content: (
      <>
        <p>Nos termos do art. 18 da LGPD, você pode solicitar a qualquer momento:</p>
        <ul>
          <li>A confirmação da existência de tratamento e o acesso aos seus dados;</li>
          <li>A correção de dados incompletos, inexatos ou desatualizados;</li>
          <li>A anonimização, o bloqueio ou a eliminação de dados desnecessários, excessivos ou tratados em desconformidade;</li>
          <li>A portabilidade dos dados a outro fornecedor, observados os segredos comercial e industrial;</li>
          <li>A eliminação dos dados tratados com base no consentimento, quando for o caso;</li>
          <li>A informação sobre com quem compartilhamos seus dados;</li>
          <li>A revisão de decisões tomadas unicamente com base em tratamento automatizado.</li>
        </ul>
        <p>
          Muitos dados podem ser corrigidos diretamente na plataforma, na tela do seu perfil. Para os demais pedidos,
          escreva para <Email /> a partir do e-mail cadastrado. Poderemos solicitar informações para confirmar sua
          identidade. Responderemos em até 15 dias, e você também pode apresentar reclamação à ANPD.
        </p>
        <p>
          Se você é usuário cadastrado por uma empresa cliente, alguns pedidos, como a exclusão do seu acesso, também podem
          ser feitos ao administrador da sua empresa.
        </p>
      </>
    ),
  },
  {
    id: "responsabilidades-cliente",
    title: "Responsabilidades da empresa cliente",
    content: (
      <p>
        O administrador da empresa cliente é quem cadastra os demais usuários (nome, e-mail, WhatsApp e CPF). A empresa
        cliente deve informar esses colaboradores sobre o cadastro e esta Política, e inserir na plataforma apenas dados e
        imagens que tenha o direito de usar.
      </p>
    ),
  },
  {
    id: "menores",
    title: "Crianças e adolescentes",
    content: (
      <p>
        A plataforma é destinada a empresas e a pessoas maiores de 18 anos que as representem. Não coletamos
        intencionalmente dados de crianças ou adolescentes. Se identificarmos esse tipo de cadastro, os dados serão
        eliminados.
      </p>
    ),
  },
  {
    id: "alteracoes",
    title: "Alterações desta Política",
    content: (
      <p>
        Podemos atualizar esta Política para refletir mudanças no serviço ou na legislação. A data da última atualização
        fica no topo da página. Em caso de mudança relevante, avisaremos pelos canais cadastrados ou dentro da plataforma.
      </p>
    ),
  },
  {
    id: "contato",
    title: "Fale conosco",
    content: (
      <>
        <p>Dúvidas, pedidos e reclamações sobre privacidade e proteção de dados:</p>
        <ul>
          <li>
            E-mail do encarregado: <Email />
          </li>
          <li>
            WhatsApp: {SUPPORT.whatsappLabel} ({SUPPORT.whatsappHours.toLowerCase()})
          </li>
        </ul>
        <p>
          Veja também os <Link href="/termos-de-uso">Termos de Uso</Link> do {SITE.name}.
        </p>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Privacidade e LGPD"
      title="Política de Privacidade"
      related={{ href: "/termos-de-uso", label: "Termos de Uso" }}
      intro={
        <p>
          Esta Política explica, de forma clara, quais dados pessoais o {SITE.name} trata, para quê, com quem compartilha,
          por quanto tempo guarda e como você pode exercer seus direitos, em conformidade com a Lei Geral de Proteção de
          Dados Pessoais (Lei nº 13.709/2018).
        </p>
      }
      sections={sections}
    />
  );
}
