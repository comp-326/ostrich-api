const { Schema, model } = require('mongoose')

const StandoutSchema = new Schema(
	{
		author: {
			type: String,
		},

		title: {
			type: String,
			unique: true,
		},
		description: {
			type: String,
			default: '',
		},
		audioUrl: {
			type: String,
			default: '',
		},
		imageUrl: {
			type: String,
			default: '',
		},
		views: {
			type: Number,
			min: 0,
			default: 0,
		},
		likes: {
			type: Number,
			min: 0,
			default: 0,
		},
		comments: {
			type: [
				{
					author: { type: String },
					comment: { type: String },
				},
			],
		},
		default: [],
	},
	{ timestamps: true },
)

module.exports = model('Standout', StandoutSchema)
