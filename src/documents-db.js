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

function getDocuments() {
    const documents = documentsCollection.find().toArray();
    
    return documents;
}

export { findDocument, updateDocument, getDocuments };