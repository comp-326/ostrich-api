import { Document } from 'mongoose'

export type AvailabilityType = {
	days: string[]
	openingHours: {
		from: string
		to: string
	}
}

export type UserAvailabilityType = {
	availability: AvailabilityType[]
} & Document
