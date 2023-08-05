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

function addDocument(documentName) {
    const result = documentsCollection.insertOne({
        name: documentName,
        text: ""
    })

    return result;
}

function getDocuments() {
    const documents = documentsCollection.find().toArray();
    
    return documents;
}

function deleteDocument(documentName) {
    const result = documentsCollection.deleteOne({
        name: documentName
    })

    return result;
}

export { findDocument, updateDocument, getDocuments, addDocument, deleteDocument };