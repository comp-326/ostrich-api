import { connect } from "mongoose"

export default function connectDB({ DB_URL }: { DB_URL: string }) {
	connect(DB_URL, {})
		.then(() => {
			console.log("Mongodb connected")
		})
		.catch((err) => {
			console.log(`Could not connect mongodb: reason-> ${err.message}`)
		})
}
