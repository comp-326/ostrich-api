/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express';

type IRequest = {
	[x: string]: any
} & Request

export default IRequest;
