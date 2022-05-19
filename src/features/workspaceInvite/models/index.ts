/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from '@ostrich-app-db/mongodb';
import { IWorkspaceInviteDocument, IWorkspaceInviteDocumentModel } from './interfaces';

const userRoleSchema: mongoose.Schema<IWorkspaceInviteDocument> = new mongoose.Schema({
	inviteRoleId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'WorkspaceRole'

	},
	inviteeEmail: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		enum: ['pending', 'confirmed'],
		default: 'pending'
	},
	workspaceOwnerId: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true,
		ref:'User'
	},
	note: {
		type: String,
		default: ''
	},
	workspaceId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Workspace'
	},
	inviteeId: {
		type: mongoose.Schema.Types.ObjectId,
		default:'',
		ref: 'User'
	}

}, {
	timestamps: true
});

const workspaceInviteModel = mongoose.model<IWorkspaceInviteDocument, IWorkspaceInviteDocumentModel>('WorkspaceInvites', userRoleSchema);


export default workspaceInviteModel;