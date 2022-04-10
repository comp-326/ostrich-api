/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
/**
 * ************ APPOINTMENT *****************
 */

export interface IAppointment {
	duration: number;
	owner: Record<string, any>;
	intakeId: Record<string, any>;
	startTime: Date;
	endTime: Date;
	meetingLink: string;
	title: string;
	status: string;
	intakePhoneNumber: string;
	message: string;
	emails: string[];
	_doc: any;
}

export interface IAppointmentDocument extends IAppointment, mongoose.Document {
	[x: string]: any;
}

export interface IAppointmentModel
	extends mongoose.Model<IAppointmentDocument> {
	// [x: string]: any
	getByTitle: (title: string) => Promise<IAppointmentDocument>;
}

const AppointmentSchema: mongoose.Schema<IAppointmentDocument> =
	new mongoose.Schema(
		{
			duration: { type: Number },
			owner: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
			intakeId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Intake' },
			startTime: {
				type: String,
				required: [true, 'Start time required']
			},
			endTime: { type: String, required: [true, 'End time required'] },
			meetingLink: { type: String },
			title: { type: String, required: [true, 'Title required'] },
			status: {
				type: String,
				enum: ['calcelled', 'confirmed', 'pending']
			},
			intakePhoneNumber: { type: String },
			message: { type: String },
			emails: { type: [String], default: [] }
		},
		{ timestamps: true }
	);

AppointmentSchema.statics.getByTitle = async function (title: string) {
	return await AppointmentModel.findOne({ title });
};
const AppointmentModel = mongoose.model<
	IAppointmentDocument,
	IAppointmentModel
>('Appointment', AppointmentSchema);
export default AppointmentModel;
