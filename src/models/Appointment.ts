import { Schema, model, SchemaTypes } from "mongoose"
import { IAppointmentDocument, IAppointmentModel } from "./types"

const AppointmentSchema: Schema<IAppointmentDocument> = new Schema(
    {
        duration: { type: Number },
        owner: { type: SchemaTypes.ObjectId, ref: "User" },
        intakeId: { type: SchemaTypes.ObjectId, ref: "Intake" },
        startTime: { type: String },
        meetingLink: { type: String },
        title: { type: String },
        status: { type: String },
        intakePhoneNumber: { type: String },
        message: { type: String },
        emails: { type: [String], default: [] }
    },
    { timestamps: true },
)

AppointmentSchema.statics.getByTitle = async function (title: string) {
    return await Appointment.findOne({ title })
}
export const Appointment = model<IAppointmentDocument, IAppointmentModel>(
    "Comment",
    AppointmentSchema,
)
