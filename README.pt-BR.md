<div align="center">

<img src="docs/icon.svg" width="72" alt="Logo do WebSocket Docs" />

# WebSocket Docs

**Editor de documentos colaborativo em tempo real, com Socket.IO e autenticação JWT.**

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?logo=socketdotio&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?logo=jsonwebtokens&logoColor=white)

[![Licença MIT](https://img.shields.io/badge/licen%C3%A7a-MIT-green)](LICENSE)

</div>

[English](README.md) · **Português**

> [!NOTE]
> Projeto desenvolvido durante os cursos de WebSockets da [Alura](https://www.alura.com.br/): [WebSockets com Node.js](https://cursos.alura.com.br/certificate/giobroliatto/websockets-comunicacoes-tempo-real-socket-io-mongodb) e [Autenticação com WebSockets](https://cursos.alura.com.br/certificate/giobroliatto/websockets-implemente-autenticacao-avance-socket-io).

---

## Sobre

Vários usuários abrem o mesmo documento e veem as alterações uns dos outros na hora, sem recarregar a página. Toda a comunicação entre navegador e servidor, inclusive cadastro e login, passa por eventos do Socket.IO em vez de rotas HTTP.

## Funcionalidades

- **Edição colaborativa:** o texto digitado por um usuário aparece para todos os outros que estão no mesmo documento.
- **Quem está online:** cada documento mostra a lista de usuários conectados nele, atualizada quando alguém entra ou sai.
- **Criar e excluir documentos:** a lista da página inicial é atualizada em tempo real para todos os clientes.
- **Cadastro e login:** senhas guardadas com hash `scrypt` e salt aleatório. O login devolve um JWT salvo em cookie.
- **Acesso protegido:** um middleware do Socket.IO valida o JWT no handshake antes de liberar o acesso aos documentos.

## Como funciona

1. O usuário se cadastra (`register_user`) e faz login (`authenticate_user`), recebendo um JWT.
2. O cliente se conecta ao namespace `/users`, enviando o token no handshake. O middleware `authorizeUser` verifica a assinatura e recusa a conexão se o token for inválido.
3. Ao abrir um documento (`select_document`), o socket entra numa **sala** com o nome do documento e recebe o texto salvo no MongoDB.
4. Cada alteração (`text_editor`) é gravada no banco e repassada só para os outros sockets daquela sala (`text_editor_clients`).
5. Quando alguém entra ou sai, o servidor emite `users_on_document` com a lista atualizada. Se o mesmo usuário tentar abrir o documento duas vezes, recebe `user_already_on_document`.

## Destaques técnicos

- **Salas e namespaces:** cada documento é uma sala, então as edições não vazam entre documentos. As rotas autenticadas ficam num namespace separado.
- **Senhas com `crypto` nativo:** `scryptSync` com salt de 16 bytes, e comparação com `timingSafeEqual` para evitar ataques de tempo.
- **Eventos organizados por domínio:** os handlers ficam em `src/registerEvents/` (início, documento, cadastro e login), e o acesso ao banco em módulos próprios.

## Stack

| Camada | Tecnologias |
|---|---|
| Backend | Node.js, Express, Socket.IO |
| Banco de dados | MongoDB (driver oficial) |
| Autenticação | JWT (`jsonwebtoken`), `crypto` (`scrypt`) |
| Frontend | HTML, CSS e JavaScript puros, servidos como arquivos estáticos |

## Rodando localmente

Pré-requisitos: Node.js 18+ e um MongoDB (local ou Atlas).

```bash
git clone https://github.com/giobroliatto/websocket-docs.git
cd websocket-docs
npm install
cp .env.example .env   # preencha MONGODB_URI e SECRET_JWT
npm run dev
```

Acesse http://localhost:3000. Para ver a colaboração funcionando, abra o mesmo documento em duas abas com usuários diferentes.

| Variável | Descrição |
|---|---|
| `MONGODB_URI` | Connection string do MongoDB |
| `SECRET_JWT` | Segredo usado para assinar os tokens |

## Estrutura

```
src/
├── server.js             # Express + servidor HTTP + instância do Socket.IO
├── socket-back.js        # Registro dos namespaces e eventos
├── registerEvents/       # Handlers: start, document, register, login
├── middlewares/          # Validação do JWT no handshake
├── utils/                # Hash de senha, geração de JWT, controle de conexões
├── db-connect.js         # Conexão com o MongoDB
├── documents-db.js       # Acesso à coleção de documentos
└── users-db.js           # Acesso à coleção de usuários
public/                   # Páginas de login, cadastro, lista e editor
```

---

## Licença

[MIT](LICENSE)

---

## Autor

Feito por **Giovani Broliatto**.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-giobroliatto-0A66C2?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/giobroliatto/)
