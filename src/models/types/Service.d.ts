import mongoose from "mongoose"
/**
 * ************ SERVICE *****************
 */

export type IService = {
	category: string
	feeRate: number | string
	tags: string[]
	crmTags: []
	providerFirstName: string
	providerLastName: string
	providerEmail: string
	providerPhone: string
	group: string
	cost: string
	_doc: any
}

export type IServiceDocument = {
	[x: string]: any
} & IService & mongoose.Document

export type IServiceModel = {
	findByName: (name: string) => Promise<IServiceDocument>
} & mongoose.Model<IServiceDocument>