import mongoose from "mongoose"
/**
 * ************ MESSAGE TEMPLATE *****************
 */

export type IMessage = {
	body: string
	title:string
	author: Record<string,any>
	_doc: any
}

export type IMessageDocument = {
	[x: string]: any
} & IMessage & mongoose.Document

export type IMessageModel = {
	findByName: (name: string) => Promise<IMessageDocument>
	findById: (id: string) => Promise<IMessageDocument>
} & mongoose.Model<IMessageDocument>
