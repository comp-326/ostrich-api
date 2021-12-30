/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from './../../config'
import ErrorResponse from './../../middlewares/error'
import { RequestType } from '../controllers/types'

export const verifyAuthToken = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	try {
		const AuthHeaderToken = req.headers.authorization
		if (!AuthHeaderToken)
			throw new ErrorResponse('Auth header token not provided', 400)
		const token = AuthHeaderToken.split(' ')[1]
		return jwt.verify(token, SECRET_KEY!, (err, payload) => {
			if (err)
				throw new ErrorResponse('Invalid or expired auth token', 400)
			req.user = payload
			return next()
		})
	} catch (err) {
		return next(err)
	}
}
