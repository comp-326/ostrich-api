/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { RequestType } from "../../Services/types"
import { NextFunction, Response } from "express"
import ErrorResponse from "../../../Middlewares/error"
import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../../../config"

//Confirm password reset token
export const confirmPasswordResetToken = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	try {
		const resetToken = req.params.resetToken
		if (!resetToken) return next(new ErrorResponse("Invalid link", 400))
		jwt.verify(resetToken, SECRET_KEY!, async function (err, payload) {
			if (err) {
				return next(new ErrorResponse("Reset link invalid", 401))
			}
			req.user = payload
			return next()
		})
	} catch (e) {
		return next(e)
	}
}

export const validAccountActivationToken = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	try {
		const activationToken = req.params.token
		// console.log("Paramas", req.params)

		if (!activationToken)
			return next(new ErrorResponse("No token provided", 400))
		jwt.verify(activationToken, SECRET_KEY!, async function (err, payload) {
			if (err) {
				return next(new ErrorResponse("Link has expired", 401))
			}
			req.user = payload
			return next()
		})
	} catch (e) {
		return next(e)
	}
}
