/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from '@ostrich-app/db/mongodb';
import { IWorkspaceMemberDocument,IWorkspaceMemberDocumentModel} from '@ostrich-app/features/workspaceMember/models/interfaces';

const userRoleSchema: mongoose.Schema<IWorkspaceMemberDocument> = new mongoose.Schema({
	memberEmail:{
		type:String,
		required:true,

	},
	memberPhone:{
		type:String,
		default:''
	},
	memberRole:{
		type:mongoose.SchemaTypes.ObjectId,
		required:true,
		ref:'WorkspaceRole'
	}

}, {
	timestamps: true
});

const workspaceInviteModel = mongoose.model<IWorkspaceMemberDocument, IWorkspaceMemberDocumentModel>('WorkspaceMember', userRoleSchema);


export default workspaceInviteModel;