/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NextFunction, Response } from "express"
import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../../config"
// import ErrorResponse from './../../middlewares/error'
import { RequestType } from "../Services/types"
import Workspace from "../../Models/Workspace.model"
import capitalize from "./../../Utils/capitalize"

export const Authorize = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	try {
		const AuthHeaderToken = req.headers.authorization
		if (!AuthHeaderToken)
			return res.status(400).json({
				success: false,
				message: "Auth header token not provided",
			})
		const token = AuthHeaderToken.split(" ")[1]
		return jwt.verify(token, SECRET_KEY!, (err, payload) => {
			if (err) {
				console.log(err)

				return res.status(401).json({
					success: false,
					message: capitalize(err.message),
				})
			}
			req.user = payload!
			return next()
		})
	} catch (err) {
		return next(err)
	}
}

export const AuthorizeAdmin = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	try {
		Authorize(req, res, () => {
			if (req.user.role! === "admin") {
				return next()
			} else {
				return res
					.status(403)
					.json({ success: false, message: "You are not authorized" })
			}
		})
	} catch (error) {
		return next(error)
	}
}

export const AuthorizeWorkspaceAdmin = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	try {
		Authorize(req, res, () => {
			const workspace = Workspace.findOne({
				$or: [
					{ author: req.user.userId },
					{
						$and: [
							{ _id: req.params.workspaceId },
							{ admins: { $in: [req.user.userId] } },
						],
					},
				],
			})
			if (!workspace) {
				return res.status(403).json({ success: false, message: "Unauthorized" })
			}
			return next()
		})
	} catch (error) {
		return next(error)
	}
}

export const AuthorizeWorkspaceCreator = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	try {
		Authorize(req, res, () => {
			const workspace = Workspace.findOne({
				$or: [
					{ author: req.user.userId },
					{
						$and: [
							{ _id: req.params.workspaceId },
							{ creators: { $in: [req.user.userId] } },
						],
					},
				],
			})
			if (!workspace) {
				return res.status(403).json({ success: false, message: "Unauthorized" })
			}
			return next()
		})
	} catch (error) {
		return next(error)
	}
}
