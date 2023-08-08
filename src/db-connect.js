import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb+srv://giobroliatto:123@websocket-cluster.tq90onz.mongodb.net/?retryWrites=true&w=majority");

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