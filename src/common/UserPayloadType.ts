/* eslint-disable @typescript-eslint/no-explicit-any */
export type JWTPayloadType ={
    [x:string]:any
    userId:string
    email?:string
}