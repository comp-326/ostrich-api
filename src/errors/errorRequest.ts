import { ExpressErrorInterface } from "./../types/expressError.d"
/* eslint-disable @typescript-eslint/no-explicit-any */

class ErrorClass implements ExpressErrorInterface, Error {
	[x: string]: any
	// message: string
	// statusCode: number
	name: string
	stack?: string | undefined
	constructor(public message: string, public statusCode: number) {}
}

class ExpressError extends ErrorClass {
	public statusCode: number
	message: string
	name: string
	stack?: string | undefined;
	[x: string]: any
	constructor(message: string, statusCode: number) {
		super(message, statusCode)
		this.statusCode = statusCode
	}
}

export default ExpressError
