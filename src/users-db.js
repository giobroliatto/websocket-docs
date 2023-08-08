import { usersCollection } from "./db-connect.js";
import createHashAndSalPassword from "./utils/create-hash-and-sal-password.js";

function registerUser({ user, password }) {
  const { salPassword, hashPassword } = createHashAndSalPassword(password);

  return usersCollection.insertOne({ 
    user,
    hashPassword,
    salPassword
  });
}

function findUser(user) {
  return usersCollection.findOne({
    user
  })
}

export { registerUser, findUser };