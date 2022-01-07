/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { RequestType } from './../../controllers/types/index.d'
import { NextFunction, Response } from 'express'
import ErrorResponse from './../../../middlewares/error'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from './../../../config'

//Confirm password reset token
export const confirmPasswordResetToken = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	try {
		const resetToken = req.params.resetToken
		if (!resetToken) return next(new ErrorResponse('Invalid link', 400))
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		jwt.verify(resetToken, SECRET_KEY!, async (err, _payload) => {
			if (err) {
				return next(new ErrorResponse('Reset link has expired', 401))
			}
			return next()
		})
	} catch (e) {
		return next(e)
	}
}
