import registerEventsDocument from "./registerEvents/registerEventsDocument.js";
import registerEventsStart from "./registerEvents/registerEventsStart.js";
import io from "./server.js";

io.on("connection", (socket) => {
  registerEventsDocument(socket, io);
  registerEventsStart(socket, io);
});