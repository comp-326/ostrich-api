/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
const config = {
	ENV: {
		PORT: process.env.PORT!,
		NODE_ENV: process.env.NODE_ENV!,
		SECRET_KEY: process.env.SECRET_KEY!,
		REFRESH_KEY: process.env.REFRESH_KEY!,
		BASE_URL: process.env.BASE_URL!,
		ENC_KEY: process.env.ENC_KEY!,
		COOKIE_SECRET: process.env.COOKIE_SECRET!,
		COOKIE_DOMAIN: process.env.COOKIE_DOMAIN!,
		COOKIE_PATH: process.env.COOKIE_PATH!,
		COOKIE_MAX_AGE: process.env.COOKIE_MAX_AGE!,
		COOKIE_SAMESITE: process.env.COOKIE_SAMESITE!,
		COOKIE_SECURE: process.env.COOKIE_SECURE!,
		COOKIE_HTTPONLY: process.env.COOKIE_HTTPONLY!
	},
	MAIL: {
		EMAIL_ACCOUNT: process.env.EMAIL_ACCOUNT!,
		EMAIL_PASSWORD: process.env.EMAIL_PASSWORD!
	},
	PATHS: {
		BASE_DIR: path.join(path.dirname(__filename), '.')
	},
	CLOUDINARY: {
		CLOUDINARY_NAME: process.env.CLOUDINARY_NAME!,
		CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY!,
		CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET!
	},
	DB: {
		MONGOOSE: {
			DATABASE_URL: process.env.DATABASE_URL!,
			TEST_DB_URL: process.env.TEST_DB_URL!
		},
		MONGO_DB: {
			DB_USER: '',
			DB_PASSWORD: '',
			DB_NAME: '',
			DB_PORT: ''
		},
		MYSQL: {
			DB_USER: '',
			DB_PASSWORD: '',
			DB_NAME: '',
			DB_PORT: ''
		},
		POSTGRESQL: {
			DB_USER: '',
			DB_PASSWORD: '',
			DB_NAME: '',
			DB_PORT: ''
		}
	}
};

export default config;
