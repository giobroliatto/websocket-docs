import { addDocument, findDocument, getDocuments, updateDocument } from "./documents-db.js";
import io from "./server.js";

io.on("connection", (socket) => {

  socket.on("get_documents", async (returnDocuments) => {
    const documents = await getDocuments();

    returnDocuments(documents)
  })

  socket.on("add_doc", async (documentName) => {
    const result = await addDocument(documentName);

    if (result.acknowledged)
      io.emit("add_document_interface", documentName);
  })

  socket.on("select_document", async (documentName, returnText) => {
    socket.join(documentName);

    const document = await findDocument(documentName);

    console.log(document);

    if (document) 
      returnText(document.text);
    
  })

  socket.on("text_editor", async (text, documentName) => {
    const update = await updateDocument(documentName, text);

    console.log(update);
    if (update.modifiedCount) {
      socket.to(documentName).emit("text_editor_clients", text);
    }

  });

});