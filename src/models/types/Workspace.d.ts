import  mongoose from "mongoose"
import { Document } from "mongoose"
import { IImageAsset } from ".";
/**
 * *************** WORKSPACE ****************
 */

export type IWorkspace = {
	[x: string]: any
	logoUrl: IImageAsset
	owner: unknown
	name: string
	type: string
	admins: unknown[]
	creators: unknown[]
	creator_lites: unknown[]
	members: unknown[]
	showBranding: boolean
	institutions: unknown[]
	services: unknown[]
	subscription: unknown
	settings: {
		email: {
			firstVideoView: boolean
			commentReplyVideo: boolean
			emojiReaction: boolean
		}
		desktopWeb: {
			firstVideoView: boolean
			commentReplyVideo: boolean
			emojiReaction: boolean
		}
	}
	active: boolean
}

export type IWorkspaceDocument = {
	[x: string]: any
} & IWorkspace & mongoose.Document

export type IWorkspaceModel = {
	findByName: (name: string) => Promise<ICategoryDocument>
	findById: (id: string) => Promise<ICategoryDocument>
} & mongoose.Model<ICategoryDocument> 
