import { emitAddDoc } from "./socket-front-index.js"

const documentList = document.getElementById("document-list");
const form = document.getElementById("form-add-doc");
const inputDoc = document.getElementById("input-document");

form.addEventListener("submit", event => {
    event.preventDefault();
    
    emitAddDoc(inputDoc.value);

    inputDoc.value = "";
})

function insertDocumentLink(documentName) {
    documentList.innerHTML += `
        <a 
            href="document.html?name=${documentName}" 
            class="list-group-item list-group-item-action"
            id="doc-${documentName}"
        >
            ${documentName}
        </a>
    `;
}

function removeDocumentLink(documentName) {
    const document = document.getElementById(`doc-${documentName}`);
    
    documentList.removeChild(document);
}

export { insertDocumentLink, removeDocumentLink };