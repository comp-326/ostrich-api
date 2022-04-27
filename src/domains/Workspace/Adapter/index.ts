/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { INext, IRequest, IResponse } from '@common/types';
import { WorkspaceControllerType } from '../controller';

export default function MakeRequestAdapter(
	controller: WorkspaceControllerType,
) {
	return async function (req: IRequest, res: IResponse, next: INext) {
		controller(req)
			.then((httpResponse) => {
				if (req.file || req.files) {
					return next();
				}
				return res
					.status(httpResponse.statusCode)
					.json({ ...httpResponse.body });
			})
			.catch((err) => {
				return next(err);
			});
		// res.type("json")
		// return res.status(httpResponse.statusCode).json(httpResponse.body)
	};
}
