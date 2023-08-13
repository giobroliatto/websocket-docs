import { deleteDocument, findDocument, updateDocument } from "../documents-db.js";
import { addConnection, getUsersOnDocument } from "../utils/document-connections.js";

function registerEventsDocument(socket, io) {
  socket.on(
    "select_document", 
    async ({ documentName, username }, returnText) => {
    const document = await findDocument(documentName);

    if (document) {
      socket.join(documentName);

      addConnection({ documentName, username });

      const usersOnDocument = getUsersOnDocument(documentName);

      io.to(documentName).emit("users_on_document", usersOnDocument) // io.to emite para todos os usuários, inclusive o que está conectado

      returnText(document.text);
    } 
    
  })

  socket.on("text_editor", async (text, documentName) => {
    const update = await updateDocument(documentName, text);

    if (update.modifiedCount) {
      socket.to(documentName).emit("text_editor_clients", text);
    }

  });

  socket.on("delete_document", async documentName => {
    const result = await deleteDocument(documentName);

    if (result.deletedCount)
      io.emit("delete_document_success", documentName);
    
  })
}

export default registerEventsDocument;