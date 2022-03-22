import { Request } from "express";
import multer from "multer";

 type IRequest={
    [x:string]:any
}& Request

export default  IRequest