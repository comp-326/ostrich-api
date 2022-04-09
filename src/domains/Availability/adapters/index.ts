/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { INext, IRequest, IResponse } from "@common/types"
import { AvailabilityControllerType } from "../controllers"
import { IAvailabilityRequest } from "../interfaces"

export default function MakeRequestAdapter(controller: AvailabilityControllerType) {
	return async function (req: IRequest, res: IResponse,next:INext) {
		const httpRequest: IAvailabilityRequest = {
			body: req.body,
			headers: req.headers,
			params: req.params,
			query: req.query,
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
