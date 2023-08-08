import { scryptSync, timingSafeEqual } from "crypto";

function authenticateUser(passwordTyped, userFound) {
    const testHash = scryptSync(passwordTyped, userFound.salPassword, 64);

    const realHash = Buffer.from(userFound.hashPassword, "hex");

    const authenticated = timingSafeEqual(testHash, realHash);

    return authenticated;
}

export default authenticateUser;