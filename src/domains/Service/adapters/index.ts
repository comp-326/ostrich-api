/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { INext, IRequest, IResponse } from "@common/types"
import { UserControllerType } from "../controllers"
import { IUserRequest } from "../interfaces"

export default function MakeRequestAdapter(controller: UserControllerType) {
	return async function (req: IRequest, res: IResponse,next:INext) {
		const httpRequest: IUserRequest = {
			body: req.body,
			headers: req.headers,
			params: req.params,
			query: req.query,
			files: req.files,
			file: req.file,
		}
		try {
			const httpResponse = await controller(httpRequest)
			res.type("json")
			return res.status(httpResponse.statusCode).json(httpResponse.body)
		} catch (error) {
			return next(error)
		}
	}
}
