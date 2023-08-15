<h1 align="center">
   WebSocket Docs
</h1>

🚀 Using WebSockets with Socket.IO, I developed a real-time collaborative document editing application through [Alura](https://alura.com.br/)'s WebSocket courses ([WebSockets with Node.js](https://cursos.alura.com.br/certificate/giobroliatto/websockets-comunicacoes-tempo-real-socket-io-mongodb?lang=en) and [WebSocket Authentication](https://cursos.alura.com.br/certificate/giobroliatto/websockets-implemente-autenticacao-avance-socket-io?lang=en)). 🚀

## About the Project 📋

This project aims to demonstrate the practical implementation of the WebSocket protocol using the Socket.IO library in Node.js. By utilizing WebSockets, the application establishes real-time communication between clients and the server, enabling real-time collaboration in document editing.

## Key Features ✨

- Collaborative editing: multiple users can simultaneously edit the same document, with changes instantly reflected for all participants. 🔄
- Real-time events: through WebSockets, events are broadcasted in real-time to keep all clients synchronized. ⏰
- Access control: user authentication is managed through JWT, ensuring proper security and authorization to access documents. 🔐
- Room management: documents are grouped into rooms, allowing collaboration in different contexts without interference. 🏠

## How it Works 🛠️

1. Registration and authentication: users can sign up, log in, and receive JWT tokens for authentication.
2. Document editing: upon creating or accessing a document, users can edit its content in real time.
3. Collaboration: edits made by a user are transmitted through WebSockets to all other users in the same room.
4. Access Control: Socket.IO middleware verifies client authenticity and ensures proper document access.

## Technologies Used 🧰

- WebSockets with Socket.IO
- Node.js and Express for the backend
- Frontend with HTML, CSS, and JavaScript
- JWT Authentication (JSON Web Tokens)

## Learning and Development 🌱

This project allowed me to explore the power of WebSockets and the Node.js language to create real-time applications. I learned to emit events, manage rooms, ensure authentication and security, and develop seamless collaboration in shared documents.
