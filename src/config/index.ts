import config from "@base/src/node.config"

const {
	ENV: { PORT,NODE_ENV },
	DB: {
		MONGOOSE: { DB_URL },
	},
	PATHS: { BASE_DIR },
} = config

export default Object.freeze({ PORT, DB_URL, BASE_DIR,NODE_ENV })

export { PORT, DB_URL, BASE_DIR,NODE_ENV}
