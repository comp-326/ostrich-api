import app from "./app";
import http from "http";
import { HOST, PORT, VERSION } from "./../config/";

const server = http.createServer(app);

server.listen({ host: HOST, port: PORT }, () => {
  console.log(`Server running on http://${HOST}:${PORT}/${VERSION}`);
});
