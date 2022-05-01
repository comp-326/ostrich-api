/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import capitalize from '@ostrich-helpers/capitalize';
import { INext, IResponse, IRequest } from '@ostrich-common/types';
import { ExpressError } from './ExpressError';

export default function (err: any, req: IRequest, res: IResponse, next: INext) {
	if (err instanceof ExpressError) {
		const error = err as ExpressError;

		return res.status(error.statusCode).json({
			...error
		});
	}
	if (err.name === 'ValidationError') {
		const error: string[] = [];
		for (const key of Object.keys(err['errors'])) {
			error.push(`${capitalize(key)} field is required`);
		}
		return res.status(400).json({
			data: {
				error
			},
			status: 'error',
			message: 'Invalid inputs'
		});
	}
	if (err.code === 11000) {
		let error = '';
		const x: { [x: string]: any } = err['keyValue'];
		for (const key of Object.keys(x)) {
			error += `${capitalize(key)} ${x[key]} already exists`;
		}
		return res.status(409).json({
			status: 'error',
			message: 'Duplicate entry',
			data: { error }
		});
	}
	return res.status(500).json({
		status: 'error',
		message: err.message ? err.message : 'Internal server error',
		data: {}
	});
}
