/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { INext, IRequest, IResponse } from '@ostrich-common/types';
import { FolderControllerType } from '../controllers';
import { IFolderRequest } from '../interfaces';

export default function MakeRequestAdapter(controller: FolderControllerType) {
	return async function (req: IRequest, res: IResponse, next: INext) {
		const httpRequest: IFolderRequest = {
			body: req.body,
			headers: req.headers,
			params: req.params,
			query: req.query,
			files: req.files,
			file: req.file,
		};
		try {
			const httpResponse = await controller(httpRequest);
			res.type('json');
			return res.status(httpResponse.statusCode).json(httpResponse.body);
		} catch (error) {
			return next(error);
		}
	};
}
