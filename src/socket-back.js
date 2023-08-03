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

  socket.on("select_document", (documentName, returnText) => {
    socket.join(documentName);

    const document = findDocument(documentName);

    if (document) 
      returnText(document.text);
    
  })

  socket.on("text_editor", (text, documentName) => {
    const document = findDocument(documentName);

    if (document) {
      document.text = text;
      socket.to(documentName).emit("text_editor_clients", text);
    }

  });

});

function findDocument(documentName) {
  const document = documents.find(doc => {
    return doc.name === documentName;
  })

  return document;
}