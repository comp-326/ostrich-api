import { model, SchemaTypes, Schema } from 'mongoose'
import { CommentModelType } from './types'

const CommentSchema = new Schema<CommentModelType>({
	author: {
		type: SchemaTypes.ObjectId,
		ref: 'User',
	},
	comment: {
		type: String,
		required: true,
	},
})

export default model<CommentModelType>('Comment', CommentSchema)
