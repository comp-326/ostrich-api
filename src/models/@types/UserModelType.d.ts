import { Document } from 'mongoose'
import { UserAddressType } from './UserAddressType'

export type UserModelType = {
	firstName: string
	lastName: string
	username: string
	middleName: string
	gender: string
	password: string
	phone: string
	modeOfCommunication: string
	email: string
	active: boolean
	role: string
	note: string
	dateOfBirth: Date
	salutation: string
	accountType: string
	address: UserAddressType
	availability:AvailabilityType[]
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	_doc: any
} & Document
