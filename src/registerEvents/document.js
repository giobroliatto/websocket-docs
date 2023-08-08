import { deleteDocument, findDocument, updateDocument } from "../documents-db.js";

function registerEventsDocument(socket, io) {
  socket.on("select_document", async (documentName, returnText) => {
    socket.join(documentName);

    const document = await findDocument(documentName);

    if (document) 
      returnText(document.text);
    
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