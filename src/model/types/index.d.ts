/* eslint-disable @typescript-eslint/no-explicit-any */
import { Document } from 'mongoose'

export type UserModelType = {
	username: string
	firstName: string
	lastName: string
	middleName: string
	gender: string
	accountType: string
	password: string
	role: string
	email: string
	profilePic: string
	isActive: boolean
	activationDate: Date
	availability: unknown
	middleName: string
	userType: string
	dateOfBirth: Date | string
	phoneNumber: string
	modeOfCommunication: 'sms' | 'email'
	note: string
	address: {
		city: string
		street: string
		postalCode: string
		country: string
		zip: string
	}
	likedInstitutions: unknown[]
	referrals: unknown[]
	_doc: any
	ActivationToken: {
		value: string
		isUsed: boolean
	}
	PasswordToken: {
		value: string
		isUsed: boolean
	}
	passwordMatch: (password: string) => boolean
	// hashPassword: (password: string) => void
} & Document

export type AvailabilityType = { 
	days: string[], 
	startTime: string|Date, 
	endTime: string|Date, 
	_doc: any 
} & Document

export type WorkspaceModelType = {
	images: unknown[]
	logoUrl: string
	owner: unknown
	name: string
	admins: unknown[]
	creators: unknown[]
	counselors: unknown[]
	members: unknown[]
	institutions: unknown[]
	active: boolean
	_doc: any
} & Document

export type AppointmentModelType = {
	duration: number
	owner: unknown
	intakeId: unknown
	startTime: Date
	meetingLink: string
	title: string
	status: string
	intakePhoneNumber: string
	message: string
	_doc: any
} & Document

export type InstitutionModelType = {
	name: string
	description: string
	comments: unknown[]
	likes: number
	shares: number
	author: unknown
	logo: string
	images: string[]
	size: string
	population: number
	location: {
		latitude: string
		longitude: string
		city: string
	}
	_doc: any
} & Document

export type CommentModelType = {
	author: unknown
	comment: string
	_doc: any
} & Document
