import { Schema, model, SchemaTypes } from "mongoose"
import { AppointmentModelType } from "./types"

const AppointmentSchema = new Schema<AppointmentModelType>(
	{
		author: {
			type: SchemaTypes.ObjectId,
			ref: "User",
		},
		title: {
			type: String,
			required: [true, "Meeting title must be provided"],
		},
		attendees: {
			type: String,
		},
		meetingLength: {
			type: String,
			required: [true, "Meeting length required"],
		},
		category: {
			type: String,
		},
		meetingLink: {
			type: String,
			required: [true, "Meeting link required"],
		},
		messageSpecialist: {
			type: String,
		},
		phoneNumber: {
			type: String,
			required: [true, "Phone number required"],
		},
		when: {
			type: String,
		},
	},
	{ timestamps: true },
)

export default model<AppointmentModelType>("Appointment", AppointmentSchema)
