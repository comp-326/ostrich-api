/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ExpressErrorInterface extends Error {
	message: string
	statusCode: number
	[x: string]: any
}
