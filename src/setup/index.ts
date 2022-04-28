import compression from 'compression';
import v1 from '@ostrich-api/v1';
import shouldCompress from '@ostrich-utils/compression';
import express, { Application } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import expressWinston from 'express-winston';
import { HTTPerrorLogOptions, HTTPLogOptions } from '@ostrich-utils/logger';
import ErrorHandler from '@ostrich-common/errors/ErrorHandler';
import pages from '@ostrich-base/setup/pages';

export default function ({ app }: { app: Application }) {
	app.use(express.json({ limit: '30mb' }));
	app.use(express.urlencoded({ extended: true }));
	app.use(morgan('dev'));
	app.use(compression({ filter: shouldCompress }));
	app.use(helmet());
	app.use(cookieParser());
	app.use(expressWinston.logger(HTTPLogOptions));
	app.use(expressWinston.errorLogger(HTTPerrorLogOptions));

	app.use('/api/v1', v1());
	pages({app});

	/* Error handler*/
	app.use(ErrorHandler);
	return app;
}
