/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express"
import IReqError from "./errorRequest"
import capitalize from "./../utils/capitalize"

export default function (
	err: IReqError,
	req: Request,
	res: Response,
	next: NextFunction,
): Response<any, Record<string, any>> {
	let error: IReqError & { [prop: string]: any } = { ...err }
	error.message = err.message
	if (err.code === 11000) {
		const message = Object.keys(err.errors).map((k) =>
			capitalize(`${k} already exist`),
		)
		error = new IReqError(String(message), 400)
	}
	if (err.name === "ValidationError") {
		const message = Object.values(err.errors!).map(function (value) {
			return typeof value === "object" ? err.errors["message"] : value
		})
		console.log("Parsing ", message)

		error = new IReqError(String(message), 400)
	}

	if (error.message.split(/\n/).length > 1) {
		return res.status(error.statusCode || 500).json({
			success: false,
			message:
				error.message
					.replace(/\t/, "")
					.split("\n")
					.filter((e) => e !== "") || "Internal server error",
		})
	}
	return res.status(error.statusCode || 500).json({
		success: false,
		message: error.message || "Internal server error",
	})
}
