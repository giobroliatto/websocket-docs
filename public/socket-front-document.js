import { alertAndRedirect, updateTextEditor } from "./document.js";

const socket = io();

function selectDocument(name) {
  socket.emit("select_document", name, text => {
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