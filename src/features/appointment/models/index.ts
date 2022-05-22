/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from '@ostrich-app-db/mongodb';
import { IAppointmentDocument, IAppointmentDocumentModel } from './interfaces';


const appointmentSchema: mongoose.Schema<IAppointmentDocument> = new mongoose.Schema({
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Users',
		required: true,
	},
	meetingLink: {
		type: String,
		required: true
	},
	startTime: {
		type: String,
		required: true
	},
	endTime: {
		type: String,
		required: true

	},
	title: {
		type: String,
		required: true

	},
	description: {
		type: String,
		required: true
	},
	location: {
		type: String,
		required: true

	},
	meetingLength:{
		type:Number,
		required:true,
		min:0,
		default:0
	},
	attendees: {
		type: [String],
		required: true,
		default: []
	},
	status: { enum: ['confirmed', 'cancelled', 'upcoming'], type: String, required: true, default: 'upcoming' },
	expectedAttendees: { type: Number, required: true }
});

export default mongoose.model<IAppointmentDocument, IAppointmentDocumentModel>('Appointments', appointmentSchema);