import { findUser } from "../users-db.js"
import authenticateUser from "../utils/authenticate-user.js";
import generateJwt from "../utils/generate-jwt.js";

function registerEventsLogin(socket, io) {
    socket.on("authenticate_user", async ({ user, password }) => {
        const userFound = await findUser(user);

        if (userFound) {
            const authenticated = authenticateUser(password, userFound);
    
            if (authenticated) {
                const tokenJwt = generateJwt({ user });

                socket.emit("authentication_success", tokenJwt);
            } else {
                socket.emit("authentication_failure");
            }
        } else {
            socket.emit("user_not_found");
        }

    })
}

export default registerEventsLogin;