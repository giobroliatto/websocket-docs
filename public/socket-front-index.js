import { insertDocumentLink, removeDocumentLink } from "./index.js";

const socket = io('http://localhost:3000');

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

socket.on("document_exists", documentName => {
    alert(`Document "${documentName}" already exists`)
})

socket.on("delete_document_success", documentName => {
    removeDocumentLink(documentName);
})

export { emitAddDoc };