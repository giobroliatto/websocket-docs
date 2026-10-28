<div align="center">

<img src="docs/icon.svg" width="72" alt="WebSocket Docs logo" />

# WebSocket Docs

**Real-time collaborative document editor built with Socket.IO and JWT authentication.**

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?logo=socketdotio&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?logo=jsonwebtokens&logoColor=white)

[![MIT License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

</div>

**English** · [Português](README.pt-BR.md)

> [!NOTE]
> Built during [Alura](https://www.alura.com.br/)'s WebSocket courses: [WebSockets with Node.js](https://cursos.alura.com.br/certificate/giobroliatto/websockets-comunicacoes-tempo-real-socket-io-mongodb?lang=en) and [WebSocket Authentication](https://cursos.alura.com.br/certificate/giobroliatto/websockets-implemente-autenticacao-avance-socket-io?lang=en). Code comments are in Portuguese.

---

## About

Several users open the same document and see each other's changes instantly, without reloading the page. All communication between browser and server, including sign-up and login, goes through Socket.IO events instead of HTTP routes.

## Features

- **Collaborative editing:** text typed by one user shows up for everyone else on the same document.
- **Who's online:** each document shows the list of connected users, updated as people join or leave.
- **Create and delete documents:** the home page list updates in real time for every client.
- **Sign-up and login:** passwords are stored with a `scrypt` hash and a random salt. Login returns a JWT stored in a cookie.
- **Protected access:** a Socket.IO middleware validates the JWT during the handshake before granting access to documents.

## How it works

1. The user signs up (`register_user`) and logs in (`authenticate_user`), receiving a JWT.
2. The client connects to the `/users` namespace, sending the token in the handshake. The `authorizeUser` middleware checks the signature and rejects the connection if the token is invalid.
3. When a document is opened (`select_document`), the socket joins a **room** named after the document and receives the text stored in MongoDB.
4. Each change (`text_editor`) is saved to the database and relayed only to the other sockets in that room (`text_editor_clients`).
5. When someone joins or leaves, the server emits `users_on_document` with the updated list. If the same user tries to open the document twice, they get `user_already_on_document`.

## Technical highlights

- **Rooms and namespaces:** each document is a room, so edits don't leak between documents. Authenticated traffic lives in a separate namespace.
- **Passwords with native `crypto`:** `scryptSync` with a 16-byte salt, compared with `timingSafeEqual` to prevent timing attacks.
- **Events organized by domain:** handlers live in `src/registerEvents/` (start, document, register and login), and database access in its own modules.

## Stack

| Layer | Technologies |
|---|---|
| Backend | Node.js, Express, Socket.IO |
| Database | MongoDB (official driver) |
| Auth | JWT (`jsonwebtoken`), `crypto` (`scrypt`) |
| Frontend | Plain HTML, CSS and JavaScript, served as static files |

## Running locally

Requirements: Node.js 18+ and a MongoDB instance (local or Atlas).

```bash
git clone https://github.com/giobroliatto/websocket-docs.git
cd websocket-docs
npm install
cp .env.example .env   # fill in MONGODB_URI and SECRET_JWT
npm run dev
```

Open http://localhost:3000. To see collaboration in action, open the same document in two tabs with different users.

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB connection string |
| `SECRET_JWT` | Secret used to sign the tokens |

## Structure

```
src/
├── server.js             # Express + HTTP server + Socket.IO instance
├── socket-back.js        # Namespace and event registration
├── registerEvents/       # Handlers: start, document, register, login
├── middlewares/          # JWT validation on handshake
├── utils/                # Password hashing, JWT generation, connection tracking
├── db-connect.js         # MongoDB connection
├── documents-db.js       # Documents collection access
└── users-db.js           # Users collection access
public/                   # Login, sign-up, list and editor pages
```

---

## License

[MIT](LICENSE)

---

## Author

Made by **Giovani Broliatto**.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-giobroliatto-0A66C2?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/giobroliatto/)
