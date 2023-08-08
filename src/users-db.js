import { usersCollection } from "./db-connect.js";

function registerUser({ user, password }) {
  return usersCollection.insertOne({ 
    user,
    password 
  });
}

function findUser(user) {
  return usersCollection.findOne({
    user
  })
}

export { registerUser, findUser };