import { insertDocumentLink } from "./index.js";

const socket = io();

socket.emit("get_documents", (documents) => {
    documents.forEach(doc => {
        insertDocumentLink(doc.name);
    })
});

function emitAddDoc(name) {
    socket.emit("add_doc", name);
}

socket.on("add_document_interface", documentName => {
    insertDocumentLink(documentName);
})

export { emitAddDoc };