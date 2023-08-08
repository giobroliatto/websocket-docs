import { randomBytes, scryptSync } from "crypto";

function createHashAndSalPassword(passwordTyped) {
  const salPassword = randomBytes(16).toString("hex");

  const hashPassword = scryptSync(passwordTyped, salPassword, 64).toString("hex");

  return { salPassword, hashPassword };
}

export default createHashAndSalPassword;