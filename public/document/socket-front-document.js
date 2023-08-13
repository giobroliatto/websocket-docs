import { getCookie } from "../utils/cookies.js"
import { alertAndRedirect, handleAuthorizationSuccess, updateTextEditor } from "./document.js";

const socket = io("/users", {
  auth: {
    token: getCookie("tokenJwt")
  }
});

socket.on("connect_error", err => {
  alert(err);
  window.location.href = "/login/index.html"
})

socket.on("authorization_success", handleAuthorizationSuccess)

function selectDocument(entryData) {
  socket.emit("select_document", entryData, text => {
    updateTextEditor(text);
  });
}

function emitTextEditor(text, documentName) {
  socket.emit("text_editor", text, documentName);
}

function emitDeleteDocument(documentName) {
  socket.emit("delete_document", documentName);
}

socket.on("text_editor_clients", text => {
  updateTextEditor(text);
})

socket.on("delete_document_success", documentName => {
  alertAndRedirect(documentName);
})

export { emitTextEditor, selectDocument, emitDeleteDocument };