/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express"

export type IRequest = { [x: string]: any } & Request
export type IResponse = Response
export type INext = NextFunction
export type JWTPayloadType ={
    [x:string]:any
    userId:string
    email?:string
}