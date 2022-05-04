import { HTTPLogOptions, HTTPerrorLogOptions } from '@ostrich-utils/logger';
import express, { Application } from 'express';
import ErrorHandler from '@ostrich-common/errors/ErrorHandler';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import expressWinston from 'express-winston';
import helmet from 'helmet';
import morgan from 'morgan';
import pages from '@ostrich-base/setup/pages';
import shouldCompress from '@ostrich-utils/compression';
import v1 from '@ostrich-api/v1';

export default function ({ app }: { app: Application }){
	app.use(express.json({ limit: '30mb' }));
	app.use(express.urlencoded({ extended: true }));
	app.use(morgan('dev'));
	app.use(compression({ filter: shouldCompress }));
	app.use(cookieParser());
	app.use(expressWinston.logger({ ...HTTPLogOptions }));
	app.use(expressWinston.errorLogger(HTTPerrorLogOptions));
	app.use(cors({ origin: '*' }));
	app.enable('trust proxy');
	app.set('trust proxy', 1);
	if (process.env.NODE_ENV === 'production') 
		app.use(helmet());
	
	app.use('/', v1());
	pages({ app });

	/* Error handler */
	app.use(ErrorHandler);
	return app;
}
