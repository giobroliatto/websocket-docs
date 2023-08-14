import { deleteDocument, findDocument, updateDocument } from "../documents-db.js";
import { addConnection, findConnection, getUsersOnDocument, removeConnection } from "../utils/document-connections.js";

function registerEventsDocument(socket, io) {
  socket.on(
    "select_document", 
    async ({ documentName, username }, returnText) => {
    const document = await findDocument(documentName);

    if (document) {
      const connectionFound = findConnection(documentName, username);

      if (!connectionFound) {
        socket.join(documentName);
  
        addConnection({ documentName, username });

        socket.data = {
          userAccessed: true
        };
  
        const usersOnDocument = getUsersOnDocument(documentName);
  
        io.to(documentName).emit("users_on_document", usersOnDocument); // io.to emite para todos os usuários, inclusive o que está conectado
  
        returnText(document.text);
      } else {
        socket.emit("user_already_on_document");
      } 
    } 

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

    socket.on("disconnect", () => {
      if (socket.data.userAccessed) {
        removeConnection(documentName, username);
  
        const usersOnDocument = getUsersOnDocument(documentName);
  
        io.to(documentName).emit("users_on_document", usersOnDocument);
      }
    })

  })
}

export default registerEventsDocument;