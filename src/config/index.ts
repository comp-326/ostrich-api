import config from "@base/src/node.config"

const {
	ENV: { PORT, NODE_ENV, REFRESH_KEY, SECRET_KEY },
	DB: {
		MONGOOSE: { DB_URL },
	},
	PATHS: { BASE_DIR },
	MAIL: { EMAIL_ACCOUNT, EMAIL_PASSWORD },
	CLOUDINARY: { CLOUDINARY_API_KEY, CLOUDINARY_NAME, CLOUDINARY_SECRET },
} = config

export default Object.freeze({
	PORT,
	DB_URL,
	BASE_DIR,
	NODE_ENV,
	EMAIL_ACCOUNT,
	EMAIL_PASSWORD,
	REFRESH_KEY,
	SECRET_KEY,
	CLOUDINARY_API_KEY,
	CLOUDINARY_NAME,
	CLOUDINARY_SECRET,
})

export {
	PORT,
	DB_URL,
	BASE_DIR,
	NODE_ENV,
	EMAIL_ACCOUNT,
	EMAIL_PASSWORD,
	REFRESH_KEY,
	SECRET_KEY,
	CLOUDINARY_API_KEY,
	CLOUDINARY_NAME,
	CLOUDINARY_SECRET,
}
