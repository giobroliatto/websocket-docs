import express from "express";
import url from "url";
import path from "path";
import http from "http";
import { Server } from "socket.io";

const app = express();
const port = process.env.port || 3000;

const currentRoute = url.fileURLToPath(import.meta.url);
const publicDirectory = path.join(currentRoute, "../..", "public");
app.use(express.static(publicDirectory));

const httpServer = http.createServer(app);

httpServer.listen(port, () => console.log(`servidor escutando na porta ${port}`));

const io = new Server(httpServer);

io.on("connection", () => {
  console.log("cliente se conectou")
});