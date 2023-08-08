import express from "express";
import url from "url";
import path from "path";
import http from "http";
import { Server } from "socket.io";

import "./db-connect.js";

const app = express();
const port = process.env.port || 3000;

const currentRoute = url.fileURLToPath(import.meta.url);
const publicDirectory = path.join(currentRoute, "../..", "public");
app.use(express.static(publicDirectory));

const httpServer = http.createServer(app);
const httpServer2 = http.createServer(app);

httpServer.listen(port, () => console.log(`servidor escutando na porta ${port}`));
httpServer2.listen(5000, () => console.log(`servidor escutando na porta 5000`));

const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5000",
    },
});

export default io;