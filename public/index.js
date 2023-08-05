import "./socket-front-index.js"

const documentList = document.getElementById("document-list");

function insertDocumentLink(documentName) {
    documentList.innerHTML += `
        <a 
            href="document.html?name=${documentName}" 
            class="list-group-item list-group-item-action"
        >
            ${documentName}
        </a>
    `;
}

export { insertDocumentLink };