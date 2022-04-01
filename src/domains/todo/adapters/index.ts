/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IRequest, IResponse } from "@common/types"
import { TodoControllerType } from "../controllers"
import { ITodoRequest } from "../interfaces"

export default function MakeRequestAdapter(controller: TodoControllerType) {
	return async function (req: IRequest, res: IResponse) {
		const httpRequest: ITodoRequest = {
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
			return res
				.status(error.status ? error.status : 500)
				.json({ error: error.message })
		}
	}
}
