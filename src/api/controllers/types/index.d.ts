/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express'

export type RequestType = {
	[prop: string]: any
} & Request
