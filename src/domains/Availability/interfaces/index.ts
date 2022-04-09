/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	dayInitialType,
	dayType,
	dayValueType,
} from "@base/src/models/Availability/AvailabilityModel"

export interface IAvailability {
	startTime: string
	endTime: string
	days: daysType[]
}

export type daysType = {
	day: dayType
	value: dayValueType
	initial: dayInitialType
	position: number
}
export interface IAvailabilityRequest {
	[x: string]: Record<string,any>
	body: any
	query: any
	params:any
	headers: any
}

export interface IAvailabilityRepository {
	createAvailability: (userId: string, data: IAvailability) => Promise<any>
	findById: (id: string) => Promise<any>
	find: (userId: string) => Promise<any>
	updateById: (id: string, data: IAvailability) => Promise<any>
	deleteById: (id: string) => Promise<any>
}

export interface IAvailabilityValidator {
	isValiDays: (days: any) => boolean
}
