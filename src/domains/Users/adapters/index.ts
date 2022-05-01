/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { INext, IRequest, IResponse } from '@ostrich-common/types';
import { ExpressError } from '@ostrich/src/common/errors/ExpressError';
import { UserControllerType } from '../controllers';
import { IUserRequest } from '../interfaces';

export default function MakeRequestAdapter(controller: UserControllerType) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	return async function (req: IRequest, res: IResponse, next: INext) {
		const httpRequest: IUserRequest = {
			body: req.body,
			headers: req.headers,
			params: req.params,
			query: req.query,
			files: req.files!,
			file: req.file
		};
		await controller(httpRequest)
			.then(httpResponse => {
				res.status(httpResponse.statusCode).json(httpResponse.body);
			})
			.catch(err => {
				const error = err as ExpressError;
				return res.status(error.statusCode ? error.statusCode : 500).json({
					message: error.message,
					data: error.data,
					status: error.status
				});
			});
	};
}
