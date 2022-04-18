/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { INext, IRequest, IResponse } from '@common/types';
import { UserControllerType } from '../controllers';
import { IAuthRequest } from '../interfaces';

export default function makeAuthRequestAdapter(controller: UserControllerType) {
	return async function (req: IRequest, res: IResponse, next: INext) {
		const httpRequest: IAuthRequest = {
			body: req.body,
			headers: req.headers,
			params: req.params,
			query: req.query,
			files: req.files,
			file: req.file
		};
		try {
			const httpResponse: any = await controller(httpRequest);
			if (httpResponse.body.AuthToken) {
				return res
					.cookie('access_token', httpResponse.body.AuthToken, {
						httpOnly: true,
						secure: true,
						maxAge: 1000 * 60 * 60 * 24 * 7,
						path: '/'
					})
					.status(200)
					.json({
						...httpResponse.body
					});
			}

			return res.status(httpResponse.statusCode).json(httpResponse.body);
		} catch (error) {
			return next(error);
		}
	};
}
