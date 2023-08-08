import { addDocument, findDocument, getDocuments } from "../documents-db.js";

function registerEventsStart(socket, io) {
  socket.on("get_documents", async (returnDocuments) => {
    const documents = await getDocuments();

    returnDocuments(documents)
  })

  socket.on("add_doc", async (documentName) => {
    const documentExists = (await findDocument(documentName)) !== null;

    if (documentExists) {
      socket.emit("document_exists", documentName);
    } else {
      const result = await addDocument(documentName);
  
      if (result.acknowledged)
        io.emit("add_document_interface", documentName);
    }

  })
}

export default registerEventsStart;