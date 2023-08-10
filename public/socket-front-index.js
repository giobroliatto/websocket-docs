import { insertDocumentLink, removeDocumentLink } from "./index.js";
import { getCookie } from "./utils/cookies.js";

const socket = io("/users", {
    auth: {
        token: getCookie("tokenJwt")
    }
});

socket.on("connect_error", err => {
    alert(err);
    window.location.href = "/login/index.html"
})

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