import { Application } from "express"
import { DATABASE_URL, PORT } from "../config"
import http from "http"
import db from "../db"



/**
 *
 * @param {{app:express.Application}} param0
 */
export default ({ app }:{app:Application}) => {
	db({ DATABASE_URL })
	const server = http.createServer(app)
	server.listen(PORT, () => {
		const msg = `Server listening on port ${PORT}`
		console.log(msg)
	})
}
