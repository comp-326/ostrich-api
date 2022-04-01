/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dotenv from "dotenv"
import path from "path"

dotenv.config()
const config = {
	["ENV"]: {
		["PORT"]: process.env.PORT,
		["NODE_ENV"]: process.env.NODE_ENV,
	},
	["PATHS"]: {
		["BASE_DIR"]: path.join(path.dirname(__filename), "."),
	},

	["DB"]: {
		["MONGOOSE"]: {
			["DB_URL"]: process.env.DATABASE_URL!,
		},
	},
}

export default config
