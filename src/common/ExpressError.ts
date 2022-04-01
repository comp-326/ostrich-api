/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IExpressError extends Error {
	status: number
	isOperational: boolean
	toJSON: () => any
}

export class ExpressError implements IExpressError {
	status: number
	isOperational: boolean
	name: string
	message: string
	stack?: string | undefined
	constructor(message: string, status: number) {
		this.message = message
		this.status = status
	}
	toJSON = () => {
		return { message: this.message, status: this.status }
	}
}
