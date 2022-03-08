import mongoose from "mongoose"
/**
 * ************ AVAILABILITY *****************
 */
export interface AvailabilityInterface {
	startTime: string
	endTime: string
	days: AvailabilityDayInterface[]
}
export interface AvailabilityDayInterface {
	day: string
	value: string
	initial: string
	position: number
}

export interface IAvailability {
	user: Record<string,any>
	availability: AvailabilityInterface
	_doc: any
}

export interface IAvailabilityDocument extends IAvailability, mongoose.Document {
	[x: string]: any
}

export interface IAvailabilityModel extends mongoose.Model<IAvailabilityDocument> {
	findByName: (name: string) => Promise<IAvailabilityDocument>
	findById: (id: string) => Promise<IAvailabilityDocument>
}