import mongoose from 'mongoose';
import { BASE_DIR, environmentConfig, mongoConfig } from '@ostrich-config';
import winston from 'winston';
import moment from 'moment';
import path from 'path';
import chalk from 'chalk';

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
	const time = moment(new Date().getTime()).format('LLLL');
	Logger.info({
		message: 'Mongoose connected',
		timestamp: time,
		level: 'info',
		service: 'Mongoose'
	});
});
mongoose.connection.on('disconnected', () => {
	Logger.info({
		message: 'Mongoose dis-connected',
		timestamp: `${moment(new Date().getTime()).format('LLLL')}`,
		level: 'info',
		service: 'Mongoose'
	});
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
mongoose.connection.on('error', (err: any) => {
	const time = moment(new Date().getTime()).format('LLLL');
	Logger.error({
		message: 'Mongoose Disconnected',
		reason: `${err.message}`,
		timestamp: `${time}`,
		level: 'info',
		service: 'Mongoose'
	});
});
mongoose.connection.on('reconnected', () => {
	Logger.info({
		message: 'Mongoose re-connected',
		timestamp: `${chalk.yellow(moment(new Date().getTime()).format('LLLL'))}`,
		level: 'info',
		service: 'Mongoose'
	});
});

export default mongoose;
