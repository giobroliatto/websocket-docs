import { documentsCollection } from "./db-connect.js";

function findDocument(documentName) {
    const document = documentsCollection.findOne({
        name: documentName
    })

    return document;
}

function updateDocument(documentName, documentText) {
    const update = documentsCollection.updateOne(
        {
            name: documentName
        }, 
        {
            $set: { text: documentText }
        }
    )

    return update;
}

export { findDocument };
export { updateDocument };