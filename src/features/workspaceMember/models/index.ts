/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from '@ostrich-app-db/mongodb';
import { IWorkspaceMemberDocument, IWorkspaceMemberDocumentModel } from './interfaces';

const workspaceMemberSchema: mongoose.Schema<IWorkspaceMemberDocument> = new mongoose.Schema({
	member: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true,
		ref: 'Users'

	},
	workspaceId: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true,
		ref: 'Workspaces'
	},
	memberEmail: {
		type: String,
		required: true
	},
	memberRole: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true,
		ref: 'WorkspaceRoles'
	}

}, {
	timestamps: true
});

const workspaceMemberModel = mongoose.model<IWorkspaceMemberDocument, IWorkspaceMemberDocumentModel>('WorkspaceMember', workspaceMemberSchema);


export default workspaceMemberModel;