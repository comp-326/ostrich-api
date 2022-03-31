import mongoose from "mongoose"

/**
 *
 * @param {{DATABASE_URL:string}} param0
 */
export default ({ DATABASE_URL }: { DATABASE_URL: string }) => {
	mongoose
		.connect(DATABASE_URL)
		.then(() => {
			console.log("Database connected")
		})
		.catch((err) => {
			console.log(err.message)
		})
}
