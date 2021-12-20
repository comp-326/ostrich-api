const { Schema, model, SchemaTypes } = require('mongoose')
const { APPT_STATE } = require('../helpers/constants')

const AppointmentSchema = new Schema(
	{
		appointee: {
			type: SchemaTypes.ObjectId,
			ref: 'User',
		},
		author: {
			type: SchemaTypes.ObjectId,
			ref: 'User',
		},

		title: {
			type: String,
		},
		meetingTime: {
			type: SchemaTypes.Date,
			required: true,
		},
		endTime: {
			type: SchemaTypes.Date,
		},
		description: {
			type: SchemaTypes.String,
			default: '',
		},
		duration: {
			type: Number,
			min: 10,
			required: true,
		},
		status: {
			type: String,
			default: APPT_STATE.pending,
		},
	},
	{ timestamps: true },
)

module.exports = model('Appointment', AppointmentSchema)
