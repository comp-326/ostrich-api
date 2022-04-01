/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { INext, IRequest, IResponse } from "@root/common/types"

export function login_required() {
	return function (
		_target: any,
		_key: string | symbol,
		descriptor: PropertyDescriptor,
	) {
		const originalMethod = descriptor.value
		descriptor.value = function (
			req: IRequest,
			_res: IResponse,
			next: INext,
		) {
			if (!req.user) {
				return { statusCode: 401, body: "Unauthorized" }
			}
			return next()
		}
		return originalMethod
	}
}
