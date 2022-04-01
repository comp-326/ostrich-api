/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express"

type IRequest = { [x: string]: any } & Request
type IResponse = Response
type INext = NextFunction
