/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from '@ostrich-app-db/mongodb';
import { IWorkspaceInviteDocument, IWorkspaceInviteDocumentModel } from './interfaces';

const userRoleSchema: mongoose.Schema<IWorkspaceInviteDocument> = new mongoose.Schema({
	inviteRole: {
		type: String,
		required: true,

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
	workspaceOwnerEmail: {
		type: String,
		required: true
	},
	note: {
		type: String,
		default: ''
	},
	workspaceOwnerId: {
		type: String,
		required: true
	}

}, {
	timestamps: true
});

const workspaceInviteModel = mongoose.model<IWorkspaceInviteDocument, IWorkspaceInviteDocumentModel>('WorkspaceInvite', userRoleSchema);


export default workspaceInviteModel;