import { findUser, registerUser } from "../users-db.js";

function registerEventsRegister(socket, io) {
  socket.on("register-user", async data => {
    const user = await findUser(data.user);

    if (user === null) {
      const result = await registerUser(data);
      
      if (result.acknowledged) {
        socket.emit("register_success");
      } else {
        socket.emit("register_failure");
      }
    } else {
      socket.emit("user_exists");
    }

  })
}

export default registerEventsRegister;