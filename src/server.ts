import http from 'http'
import app from './app'
import { HOST, VERSION } from './config'

const PORT = process.env.PORT || 4200

const server = http.createServer(app)

server.listen(PORT, () => {
	const msg = `Server running on port http://${HOST}:${PORT}/${VERSION}`
	console.log(msg)
})
