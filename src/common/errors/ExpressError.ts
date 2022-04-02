/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IExpressError extends Error {
	statusCode: number
	isOperational: boolean
	[x: string]: any
	toJSON: () => any
}

export class ExpressError implements IExpressError {
	statusCode: number
	isOperational: boolean
	name: string
	message: string
	stack?: string | undefined;
	[x: string]: any
	constructor(message: string, statusCode: number) {
		this.message = message
		this.statusCode = statusCode
	}
	toJSON = () => {
		return { message: this.message, statusCode: this.statusCode }
	}
}
