/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ExpressError } from "@base/src/common/errors/ExpressError"
import { INext, IRequest, IResponse } from "@common/types"
import { UserControllerType } from "../controllers"
import { IAuthRequest } from "../interfaces"

export default function makeAuthRequestAdapter(controller: UserControllerType) {
	return async function (req: IRequest, res: IResponse, next: INext) {
		const httpRequest: IAuthRequest = {
			body: req.body,
			headers: req.headers,
			params: req.params,
			query: req.query,
			files: req.files,
			file: req.file,
		}
		try {
			const httpResponse: any = await controller(httpRequest)
			res.type("json")
			if (
				Object.keys(httpResponse).includes("message") &&
				Object.keys(httpResponse).includes("statusCode") &&
				Object.keys(httpResponse).includes("toJSON")
			) {
				return next(
					new ExpressError(
						httpResponse?.message,
						httpResponse["statusCode"],
					),
				)
			}

			return res.status(httpResponse.statusCode).json(httpResponse.body)
		} catch (error) {
			return next(error)
		}
	}
}
