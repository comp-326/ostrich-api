import config from '@ostrich-base/node.config';

const {
	ENV,
	DB: {
		MONGOOSE
	},
	PATHS: { BASE_DIR },
	MAIL,
	CLOUDINARY
} = config;

export {
	MONGOOSE as mongoConfig,
	MAIL as mailConfig,
	ENV as environmentConfig,
	CLOUDINARY as cloudinaryConfig,
	BASE_DIR
};
