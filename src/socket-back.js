import registerEventsDocument from "./registerEvents/document.js";
import registerEventsRegister from "./registerEvents/register.js";
import registerEventsStart from "./registerEvents/start.js";
import io from "./server.js";

io.on("connection", (socket) => {
  registerEventsDocument(socket, io);
  registerEventsStart(socket, io);
  registerEventsRegister(socket, io);
});