/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from '@ostrich-app-db/mongodb';
import { IWorkspaceMemberDocument,IWorkspaceMemberDocumentModel} from './interfaces';

const workspaceMemberSchema: mongoose.Schema<IWorkspaceMemberDocument> = new mongoose.Schema({
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

const workspaceMemberModel = mongoose.model<IWorkspaceMemberDocument, IWorkspaceMemberDocumentModel>('WorkspaceMember', workspaceMemberSchema);


export default workspaceMemberModel;