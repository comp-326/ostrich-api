import { Document } from 'mongoose'

export type TakeOutType = {
	name: string
	owner: string
	type: string
	location: string
	country: string
	locationType: string
	size: number
} & Document
