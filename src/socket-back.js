import io from "./server.js";

const documents = [
  {
    name: "JavaScript",
    text: "javascript text"
  },
  {
    name: "Node",
    text: "node text"
  },
  {
    name: "Socket.io",
    text: "socket.io text"
  }
];

io.on("connection", (socket) => {
  console.log("cliente se conectou", socket.id);

  socket.on("select_document", (documentName) => {
    socket.join(documentName);

    const document = findDocument(documentName);

    if (document) {
      socket.emit("document_text", document.text);
    }

  })

  socket.on("text_editor", (text, documentName) => {
    // socket.broadcast.emit("text_editor_clients", text);

    socket.to(documentName).emit("text_editor_clients", text);
  });

});

function findDocument(documentName) {
  const document = documents.find(doc => {
    return doc.name === documentName;
  })

  return document;
}