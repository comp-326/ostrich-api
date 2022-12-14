// eslint-disable-next-line camelcase
import { BASE_DIR } from '@ostrich-app/config';
import ErrorHandler from '@ostrich-app-common/errors/ErrorHandler';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import expressWinston from 'express-winston';
import helmet from 'helmet';
import morgan from 'morgan';
import pages from './pages';
import path from 'path';
import serverFavicon from 'serve-favicon';
import shouldCompress from '@ostrich-app-utils/compression';
import v1 from '@ostrich-app-api/v1';
import express, { Application } from 'express';
import { httpErrorLogOptions, httpLogOptions } from '@ostrich-app-utils/logger';

export default function ({ app }: { app: Application }) {
	app.use(express.json({ limit: '30mb' }));
	app.use(express.urlencoded({ extended: true }));
	app.use(morgan('dev'));
	app.use(compression({ filter: shouldCompress }));
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	app.use(serverFavicon(path.join(BASE_DIR, 'favicon', 'favicon.ico'), {}));
	app.use(cookieParser());
	app.use(expressWinston.logger({ ...httpLogOptions }));
	app.use(expressWinston.errorLogger(httpErrorLogOptions));
	app.use(cors({ origin: '*' }));
	app.enable('trust proxy');
	app.set('trust proxy', 1);
	if (process.env.NODE_ENV === 'production') app.use(helmet());

	app.use('/api/v1/', v1());
	pages({ app });

	/* Error handler */
	app.use(ErrorHandler);

	return app;
}
