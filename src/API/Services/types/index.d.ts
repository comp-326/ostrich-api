/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from "express"

export type RequestType = {
	[props: string]: any
} & Request
