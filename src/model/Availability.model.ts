import { model, Schema, SchemaTypes } from 'mongoose'
import { AvailabilityType } from './types'

const AvailabilitySchema = new Schema<AvailabilityType>({
	days: {
		type: [String],
	},
	startTime: { type: SchemaTypes.Date },
	endTime: { type: SchemaTypes.Date }
})

export default model<AvailabilityType>('Availability', AvailabilitySchema)