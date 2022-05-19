/* eslint-disable @typescript-eslint/naming-convention */
import config from '@ostrich-app/node.config';

const {
	ENV,
	DB: {
		MONGOOSE
	},
	PATHS: { BASE_DIR },
	MAIL,
	CLOUDINARY,
	redisConfig,
	rabbitMqConfig
} = config;
const DB_URL =
	ENV.NODE_ENV === 'development' ?
		MONGOOSE.DATABASE_URL :
		ENV.NODE_ENV === 'production'
			? MONGOOSE.DATABASE_URL
			: MONGOOSE.TEST_DB_URL;
<<<<<<< HEAD
=======

>>>>>>> 19227add749a048126a79c4f5addd72379b1e746
export {
	DB_URL,
	MAIL as mailConfig,
	ENV as environmentConfig,
	CLOUDINARY as cloudinaryConfig,
	BASE_DIR,
	redisConfig,
	rabbitMqConfig,
};
