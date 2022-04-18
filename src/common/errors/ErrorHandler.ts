/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { INext, IResponse, IRequest } from '../types';
import { ExpressError } from './ExpressError';

export default function (err: any, req: IRequest, res: IResponse, next: INext) {
	if (err instanceof ExpressError) {
		const error = err as ExpressError;

		return res.status(error.statusCode).json({
			...error
		});
	}
	console.log('Err', err);

	return res.status(500).json({
		status: 'error',
		message: 'Internal server error',
		data: {}
	});
}
