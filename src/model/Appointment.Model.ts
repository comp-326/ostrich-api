import { Schema, model, SchemaTypes } from 'mongoose'
import { AppointmentModelType } from './types'

const AppointmentSchema = new Schema<AppointmentModelType>(
	{
		appointee: {
			type: SchemaTypes.ObjectId,
			ref: 'User',
		},
		status: {
			type: String,
			default: 'pending',
		},

		startTime: {
			type: SchemaTypes.Date,
		},
		endTime: {
			type: SchemaTypes.Date,
		},
		duration: {
			type: Number,
		},
		author: {
			type: SchemaTypes.ObjectId,
			ref: 'User',
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
)

export default model<AppointmentModelType>('Appointment', AppointmentSchema)
