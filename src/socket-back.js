import "dotenv/config";

import registerEventsDocument from "./registerEvents/document.js";
import registerEventsLogin from "./registerEvents/login.js";
import registerEventsRegister from "./registerEvents/register.js";
import registerEventsStart from "./registerEvents/start.js";

import io from "./server.js";
import authorizeUser from "./middlewares/authorize-user.js"

io.use(authorizeUser);

io.on("connection", (socket) => {
  registerEventsRegister(socket, io);
  registerEventsLogin(socket, io);
  registerEventsStart(socket, io);
  registerEventsDocument(socket, io);
});