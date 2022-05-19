/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from '@ostrich-app-db/mongodb';

export interface IWorkspace {
    name: string
    ownerId: any
    logo: any,
	type:'personal'|'business'|'education'
}

export interface IWorkspaceDocument extends IWorkspace, mongoose.Document {
    _id: any
}

export interface IWorkspaceDocumentModel extends mongoose.Model<IWorkspaceDocument> {
    findByName: (name: string) => Promise<any>
    findWorkspaceById: (id: string) => Promise<any>
}

const workspaceSchema: mongoose.Schema<IWorkspaceDocument> = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	ownerId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},
	logo: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Media'
	}
}, { timestamps: true });

const workspaceModel: IWorkspaceDocumentModel = mongoose.model<IWorkspaceDocument, IWorkspaceDocumentModel>('Workspace', workspaceSchema);

export default workspaceModel;