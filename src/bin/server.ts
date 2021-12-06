import app from "./app"
const http = require("http")


const server = http.createServer(app)
const HOST = "localhost"
const PORT = 4200

server.listen(PORT, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);

})