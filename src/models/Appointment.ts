import { Schema, model, SchemaTypes } from "mongoose"
import { IAppointmentDocument, IAppointmentModel } from "./types"

const AppointmentSchema: Schema<IAppointmentDocument> = new Schema(
	{
		duration: { type: Number },
		owner: { type: SchemaTypes.ObjectId, ref: "User" },
		intakeId: { type: SchemaTypes.ObjectId, ref: "Intake" },
		startTime: { type: String, required: [true, "Start time required"] },
		endTime: { type: String, required: [true, "End time required"] },
		meetingLink: { type: String },
		title: { type: String, required: [true, "Title required"] },
		status: { type: String, enum: ["calcelled", "confirmed", "pending"] },
		intakePhoneNumber: { type: String },
		message: { type: String },
		emails: { type: [String], default: [] },
	},
	{ timestamps: true },
)

AppointmentSchema.statics.getByTitle = async function (title: string) {
	return await Appointment.findOne({ title })
}
export const Appointment = model<IAppointmentDocument, IAppointmentModel>(
	"Appointment",
	AppointmentSchema,
)
