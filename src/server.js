const http = require('http')
const app = require('./app')
const { PORT, API_VERSION, BASE_URL } = require('./config')

const server = http.createServer(app)

server.listen(PORT, () => {
	const message = `Server running on ${BASE_URL}:${PORT}/${API_VERSION}`
	console.log(message)
})
