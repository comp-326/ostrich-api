import { Request } from "express"

export type IRequest = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[props: string]: any
} & Request
