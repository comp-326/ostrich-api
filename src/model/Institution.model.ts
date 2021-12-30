import { model, SchemaTypes, Schema } from 'mongoose'
import { InstitutionModelType } from './types'

const InstitutionShema = new Schema<InstitutionModelType>({
	author: {
		type: SchemaTypes.ObjectId,
		ref: 'User',
	},
	description: {
		type: String,
		default: '',
	},
	comments: {
		type: [
			{
				author: {
					type: SchemaTypes.ObjectId,
					ref: 'User',
				},
				comment: {
					type: String,
					default: '',
				},
			},
		],
		default: [],
	},
})

export default model('Institution', InstitutionShema)
