/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose"
/**
 * ************ APPOINTMENT *****************
 */

export interface IAppointment {
	duration: number
	owner: Record<string,any>
	intakeId: Record<string,any>
	startTime: Date
	endTime: Date
	meetingLink: string
	title: string
	status: string
	intakePhoneNumber: string
	message: string
	emails: string[]
	_doc: any
}

export interface IAppointmentDocument extends IAppointment, mongoose.Document {
	[x: string]: any
}

export interface IAppointmentModel extends mongoose.Model<IAppointmentDocument> {
	// [x: string]: any
	getByTitle:(title:string)=>Promise<IAppointmentDocument>
}
