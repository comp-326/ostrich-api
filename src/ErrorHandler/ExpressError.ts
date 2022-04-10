/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express"
import capitalize from "../utils/capitalize"
import ErrorResponse from "./ErrorResponse"

export default function (
	err: ErrorResponse,
	req: Request,
	res: Response,
	next: NextFunction,
): Response<any, Record<string, any>> {
	let error: ErrorResponse&{[key:string]:any} = { ...err }
	error.message = err.message
	// console.log(err)
	if (err.code === 11000) {
		const message = Object.keys(err).map((k) =>
			capitalize(`${k} already exist`),
		)
		error = new ErrorResponse(String(message), 400)
	}
	if (err.name === "ValidationError") {
		const message = Object.keys(err).map(function (value) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			return typeof value === "object" ? error["message"] : value
		})
		console.log("Parsing ", message)

		error = new ErrorResponse(String(message), 400)
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