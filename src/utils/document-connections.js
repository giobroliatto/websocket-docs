const documentConnections = [];

function findConnection(documentName, username) {
  return documentConnections.find(connection => {
    return connection.documentName === documentName && connection.username === username;
  });
}

function addConnection(connection) {
  documentConnections.push(connection);
}

function getUsersOnDocument(documentName) {
  return documentConnections
    .filter(connection => connection.documentName === documentName)
    .map(connection => connection.username);
}

function removeConnection(documentName, username) {
  const index = documentConnections.findIndex(connection => {
    return connection.documentName === documentName && connection.username === username;
  });

  if (index !== -1) {
    documentConnections.splice(index, 1);
  }
}

export { addConnection, getUsersOnDocument, removeConnection, findConnection };