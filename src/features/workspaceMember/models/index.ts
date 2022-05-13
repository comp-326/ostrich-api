/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from '@ostrich-app-db/mongodb';
import { IWorkspaceMemberDocument,IWorkspaceMemberDocumentModel} from './interfaces';

const workspaceMemberSchema: mongoose.Schema<IWorkspaceMemberDocument> = new mongoose.Schema({
	memberEmail:{
		type:String,
		required:true,

	},
	workspaceId:{
		type:mongoose.SchemaTypes.ObjectId,
		required:true,
		ref:'Workspace'
	},
	memberPhone:{
		type:String,
		default:''
	},
	memberRoleId:{
		type:mongoose.SchemaTypes.ObjectId,
		required:true,
		ref:'WorkspaceRole'
	}

}, {
	timestamps: true
});

const workspaceMemberModel = mongoose.model<IWorkspaceMemberDocument, IWorkspaceMemberDocumentModel>('WorkspaceMember', workspaceMemberSchema);


export default workspaceMemberModel;