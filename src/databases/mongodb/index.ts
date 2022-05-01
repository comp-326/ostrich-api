import mongoose from 'mongoose';
import { mongoConfig, environmentConfig, BASE_DIR } from '@ostrich-config';
import winston from 'winston';
import moment from 'moment';
import path from 'path';

const url =
	environmentConfig.NODE_ENV === ('development' || 'production')
		? mongoConfig.DATABASE_URL
		: mongoConfig.TEST_DB_URL;

const Logger = winston.createLogger({
	format: winston.format.json(),
	defaultMeta: { service: 'user-service' },
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({
			filename: path.join(path.dirname(BASE_DIR), 'logs', 'db-logs.json'),
			level: 'error'
		})
	],
	exitOnError: false
});
const options = {
	autoIndex: true, // Don't build indexes
	maxPoolSize: 10, // Maintain up to 10 socket connections
	serverSelectionTimeoutMS: 50000, // Keep trying to send operations for 10 seconds
	socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
	family: 4 // Use IPv4, skip trying IPv6
};

mongoose.connect(url, options);

mongoose.connection.on('connected', () => {
	Logger.info(
		`{"message": "Mongoose connected",
		"timestamp": "${moment(new Date().getTime()).format('LLLL')}",
			"level": 'info',
			"service": "Mongoose"}
		`.replace(/[\n\t\\]/g, '')
	);
});
mongoose.connection.on('disconnected', () => {
	Logger.info(
		`{"message": "Mongoose dis-connected",
		"timestamp": "${moment(new Date().getTime()).format('LLLL')}",
			"level": 'info',
			"service": "Mongoose"}
		`.replace(/[\n\t\\]/g, '')
	);
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
mongoose.connection.on('error', (err: any) => {
	Logger.error(
		`{"message": "Mongoose Disconnected","reason":"${
			err.message
		}","timestamp": "${moment(new Date().getTime()).format(
			'LLLL'
		)}","level": "info","service": "Mongoose"}
		`.replace(/[\n\t\\]/g, '')
	);
});
mongoose.connection.on('reconnected', () => {
	Logger.info(
		`{"message": "Mongoose re-connected",
		"timestamp": "${moment(new Date().getTime()).format('LLLL')}",
			"level": 'info',
			"service": "Mongoose"}
		`.replace(/[\n\t\\]/g, '')
	);
});
export default mongoose;
