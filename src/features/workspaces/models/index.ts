/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from '@ostrich-app-db/mongodb';
import {
	IWorkspaceDocument,
	IWorkspaceDocumentModel,
} from './interfaces';

const workspaceSchema: mongoose.Schema<IWorkspaceDocument> =
	new mongoose.Schema({
		name: {
			type: String,
			required: true,
			unique: true,
		},
		logo: {
			type: mongoose.SchemaTypes.ObjectId,
			required: true,
			ref: 'Media',
		},
		owner: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'Users',
			required: true,
		},
		type: {
			type: String,
			required: true,
			enum: ['personal', 'business', 'education'],
		},
	});

const workspaceModel= mongoose.model<IWorkspaceDocument,IWorkspaceDocumentModel>(
	'Workspaces',
	workspaceSchema,
);

export default workspaceModel;
