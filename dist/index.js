import Router from "./server/router.js";
import * as http from "node:http";
import * as path from "node:path";
import { fileURLToPath } from "url";
let router = Router.setup(path.join(path.basename(path.dirname(fileURLToPath(import.meta.url))), "/routes"));
http.createServer(async (req, res) => {
    if (!req.url)
        return;
    console.log("Request recieved for path: " + req.url);
    let file = await router.getFileContent(req.url);
    res.writeHead(file.status, { "Content-Type": file.mimeType });
    res.write(file.content);
    res.end();
}).listen(8080);
console.log("Server running at http://127.0.0.1:8080/");
