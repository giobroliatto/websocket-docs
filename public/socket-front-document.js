import { updateTextEditor } from "./document.js";

const socket = io();

function selectDocument(name) {
  socket.emit("select_document", name);
}

function emitTextEditor(text, documentName) {
  socket.emit("text_editor", text, documentName);
}

socket.on("document_text", text => {
  updateTextEditor(text);
})

socket.on("text_editor_clients", text => {
  updateTextEditor(text);
})

export { emitTextEditor };
export { selectDocument };