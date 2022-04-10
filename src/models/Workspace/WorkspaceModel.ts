/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';

export type WorkspaceType = {
	owner: Record<string, any>;
	name: string;
	type: 'personal' | 'business' | 'education';
	logo: { public_id: string; url: string };
	members: Record<string, any>[];
	admins: Record<string, any>[];
	creators: Record<string, any>[];
	creatorLites: Record<string, any>[];
	services: Record<string, any>[];
	folders: Record<string, any>;
};

export type WorkspaceDocumentType = {
	[x: string]: any;
} & WorkspaceType &
	mongoose.Document;

export type WorkspaceModelType = {
	[x: string]: any;
} & mongoose.Model<WorkspaceDocumentType>;

const WorkspaceSchema: mongoose.Schema<WorkspaceDocumentType> =
	new mongoose.Schema(
		{
			owner: {
				type: mongoose.SchemaTypes.ObjectId,
				required: true,
				ref: 'User'
			},
			name: { type: String, required: true },
			type: {
				type: String,
				enum: ['personal', 'business', 'education'],
				default: 'personal',
				required: true
			},
			logo: {
				type: { public_id: String, url: String },
				default: { public_id: '', url: '' }
			},
			members: {
				type: [mongoose.SchemaTypes.ObjectId],
				default: [],
				ref: 'User'
			},
			admins: {
				type: [mongoose.SchemaTypes.ObjectId],
				default: [],
				ref: 'User'
			},
			creators: {
				type: [mongoose.SchemaTypes.ObjectId],
				default: [],
				ref: 'User'
			},
			creatorLites: {
				type: [mongoose.SchemaTypes.ObjectId],
				default: [],
				ref: 'User'
			},
			isActive: Boolean
		},
		{ timestamps: true }
	);

const WorkspaceModel = mongoose.model<
	WorkspaceDocumentType,
	WorkspaceModelType
>('Workspace', WorkspaceSchema);
export default WorkspaceModel;
