import { Schema, model, SchemaTypes } from 'mongoose'
import { WorkspaceModelType } from './types'

const WorkspaceSchema = new Schema<WorkspaceModelType>({
	owner: {
		type: SchemaTypes.ObjectId,
		ref: 'User',
	},
	active: {
		type: Boolean,
		default: true,
	},
	admins: {
		type: [{ type: SchemaTypes.ObjectId, ref: 'User' }],
		default: [],
	},
	members: {
		type: [{ type: SchemaTypes.ObjectId, ref: 'User' }],
		default: [],
	},
	creators: {
		type: [{ type: SchemaTypes.ObjectId, ref: 'User' }],
		default: [],
	},
	counselors: {
		type: [{ type: SchemaTypes.ObjectId, ref: 'User' }],
		default: [],
	},
	institutions: {
		type: [
			{
				type: SchemaTypes.ObjectId,
				ref: 'Institution',
			},
		],
		default: [],
	},
	name: {
		type: String,
		unique: true,
		index: true,
		required: [true, 'Workspace name is required'],
	},
	logoUrl: {
		type: String,
		default: '',
	},
	images: {
		type: [String],
		default: [],
	},
})

export default model<WorkspaceModelType>('Workspace', WorkspaceSchema)
