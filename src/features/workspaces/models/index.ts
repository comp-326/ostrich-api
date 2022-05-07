/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from '@ostrich-app/db/mongodb';
import {
	IWorkspaceDocument,
	IWorkspaceDocumentModel,
} from '@ostrich-app/features/workspaces/models/interfaces';

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
		ownerId: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'User',
			required: true,
		},
		type: {
			type: String,
			required: true,
			enum: ['personal', 'business', 'education'],
		},
	});

const workspaceModel= mongoose.model<IWorkspaceDocument,IWorkspaceDocumentModel>(
	'Workspace',
	workspaceSchema,
);

export default workspaceModel;
