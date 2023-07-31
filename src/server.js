import express from "express";
import url from "url";
import path from "path";

const app = express();
const port = process.env.port || 3000;

const currentRoute = url.fileURLToPath(import.meta.url);
const publicDirectory = path.join(currentRoute, "../..", "public");
app.use(express.static(publicDirectory));

app.listen(port, () => console.log(`servidor escutando na porta ${port}`));

