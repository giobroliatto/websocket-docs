const documentConnections = [];

function addConnection(connection) {
  documentConnections.push(connection);
}

function getUsersOnDocument(documentName) {
  return documentConnections
    .filter(connection => connection.documentName === documentName)
    .map(connection => connection.username);
}

export { addConnection, getUsersOnDocument };