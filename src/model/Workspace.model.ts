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
		required: true,
	},
})

export default model<WorkspaceModelType>('Workspace', WorkspaceSchema)
