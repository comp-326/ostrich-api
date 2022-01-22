import { Schema, model, SchemaTypes } from "mongoose"
import { AppointmentModelType } from "./types"

const AppointmentSchema = new Schema<AppointmentModelType>(
	{
		intakeId: {
			type: SchemaTypes.ObjectId,
			ref: "User",
			required: [true, "Intake id must be provided"],
		},
		status: {
			type: String,
			default: "pending",
		},

		startTime: {
			type: SchemaTypes.Date,
			required: [true, "Start time must be provided"],
		},
		duration: {
			type: Number,
			required: [true, "Meeting duration must be provided"],
		},
		owner: {
			type: SchemaTypes.ObjectId,
			ref: "User",
			required: [true, "User id is required"],
		},
		title: {
			type: String,
			required: [true, "Title field is required"],
		},
		meetingLink: {
			type: String,
			required: [true, "Please provide meeting link"],
		},
	},
	{ timestamps: true },
)

export default model<AppointmentModelType>("Appointment", AppointmentSchema)
