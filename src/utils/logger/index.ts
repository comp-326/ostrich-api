/* eslint-disable @typescript-eslint/no-unused-vars */
import { IRequest, IResponse } from '@ostrich-common/types';
import { BASE_DIR } from '@ostrich/src/config';
import path from 'path';
import winston from 'winston';
import moment from 'moment';

/**
 * ----------------------------  LOG HTTP ERROR REQUESTS OPTIONS -------------------------
 */
export const HTTPerrorLogOptions = {
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({
			filename: path.join(path.dirname(BASE_DIR), 'logs', 'error.json')
		})
	],

	format: winston.format.combine(
		winston.format.colorize(),
		winston.format.json(),
		winston.format.timestamp({
			alias: 'timestamp',
			format: moment.HTML5_FMT.DATETIME_LOCAL_MS
		}),
		winston.format.metadata()
	),
	exitOnError: false
};
/**
 * ---------------------------- LOG HTTP REQUESTS -----------------------------------
 */
export const HTTPLogOptions = {
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({
			filename: path.join(
				path.dirname(BASE_DIR),
				'logs',
				`${moment(new Date().getTime()).format(
					'YYYY-MM-DD'
				)}-http-requests-logs.json`
			)
		})
	],
	format: winston.format.combine(
		winston.format.colorize(),
		winston.format.json()
	),
	meta: true,
	msg: 'HTTP {{req.method}} {{req.url}}',
	expressFormat: true,
	colorize: false,
	// eslint-disable-next-line no-unused-vars
	ignoreRoute: function (_req: IRequest, _res: IResponse){
		return false;
	}
};
