import { emitDeleteDocument, emitTextEditor, selectDocument } from "./socket-front-document.js";

const params = new URLSearchParams(window.location.search);
const documentName = params.get("name");

const textEditor = document.getElementById("text-editor");
const documentTitle = document.getElementById("document-title");
const deleteButton = document.getElementById("delete-document");

documentTitle.textContent = documentName || "Documento sem título"

function handleAuthorizationSuccess(payloadToken) {
  selectDocument({ documentName, username: payloadToken.user });
}


textEditor.addEventListener("keyup", () => {
  emitTextEditor(textEditor.value, documentName);
})

deleteButton.addEventListener("click", () => {
  emitDeleteDocument(documentName);
})

function updateTextEditor(text) {
  textEditor.value = text;
}

function alertAndRedirect(name) {
  if (name === documentName) {
    alert(`Document "${name}" deleted`);
    window.location.href = "/";
  }
}

export { updateTextEditor, alertAndRedirect, handleAuthorizationSuccess };