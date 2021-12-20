const mongoose = require('mongoose')

const { Schema, model, SchemaTypes } = mongoose

const WorkspaceSchema = new Schema({
	owner: {
		type: SchemaTypes.ObjectId,
		ref: 'User',
		required: true,
	},
	folders: {
		type: [
			{
				type: SchemaTypes.ObjectId,
				ref: 'Folder',
			},
		],
		default: [],
	},
	name: {
		type: String,
		required: true,
		unique: true,
		index: true,
	},
	members: {
		type: [
			{
				type: SchemaTypes.ObjectId,
				ref: 'User',
			},
		],
		default: [],
	},
})

module.exports = model('Workspace', WorkspaceSchema)
