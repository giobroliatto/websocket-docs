import { updateTextEditor } from "./document.js";

const socket = io();

function emitTextEditor(text) {
  socket.emit("text_editor", text);
}

socket.on("text_editor_clients", (text) => {
  updateTextEditor(text);
})

export { emitTextEditor };