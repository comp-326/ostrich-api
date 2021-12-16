import { Document } from 'mongoose'

export type AppointmentModelType = {
	title: string
	intakeId: string
	phoneNumber: string
	meetingLink: string
	meetingLength: number
	when: string
	category: string
	messageSpecialist: string
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	_doc: any
} & Document
