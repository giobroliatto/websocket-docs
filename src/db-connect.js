import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

let documentsCollection;
let usersCollection;

try {
    await client.connect();

    const db = client.db("websocket-docs-db");
    documentsCollection = db.collection("documents");
    usersCollection = db.collection("users");

    console.log("conectado com sucesso ao db!")

} catch (erro) {
    console.log(erro)
}

export { documentsCollection, usersCollection };