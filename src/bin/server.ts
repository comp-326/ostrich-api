import app from "./app"
const http = require("http")
import { HOST, PORT, VERSION } from "./../config/"


const server = http.createServer(app)

server.listen(PORT, () => {
    console.log(`Server running on http://${HOST}:${PORT}/${VERSION}`);

})