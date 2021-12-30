interface IErrorResponse {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[prop: string | symbol]: any
	statusCode?: number
	message: string
	code?: number
}

class ErrorResponse extends Error implements IErrorResponse {
	public statusCode: number;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[prop: string]: any
	constructor(message: string, statusCode: number) {
		super(message)
		this.statusCode = statusCode
	}
}

export default ErrorResponse
