const { Schema, model, SchemaTypes } = require('mongoose')

const UserShema = new Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		accountType: {
			type: String,
			default: 'basic',
		},
		role: {
			type: String,
			default: 'user',
		},
		active: {
			type: Boolean,
			default: false,
		},
		password: {
			type: String,
			required: true,
			minlength: 8,
		},
		workspaces: {
			type: [{ type: Object, ref: 'Workspace' }],
			default: [],
		},
		profilePic: {
			type: String,
			default: '',
		},
		availability: {
			type: [
				{
					days: { type: [String] },
					from: { type: SchemaTypes.Date },
					to: { type: SchemaTypes.Date },
				},
			],
			default: [],
		},
		appointments: {
			type: [
				{
					type: SchemaTypes.ObjectId,
					ref: 'Appointment',
				},
			],
			default: [],
		},
		clientAppointments: {
			type: [{ type: SchemaTypes.ObjectId }],
			default: [],
		},
	},

	{ timestamps: true },
)

module.exports = model('User', UserShema)
