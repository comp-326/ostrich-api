import mongoose from "mongoose"
/**
 * ************ COMMENT *****************
 */

export type IComment = {
    [x: string]: any
    body: string
    author: Record<string,any>
    _doc: any
}

export type ICommentDocument = {
    [x: string]: any
} & IComment & mongoose.Document

export type ICommentModel = {
    findByName: (name: string) => Promise<ICommentDocument>
} & mongoose.Model<ICommentDocument>
