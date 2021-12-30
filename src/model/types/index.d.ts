/* eslint-disable @typescript-eslint/no-explicit-any */
import { Document } from 'mongoose'

export type UserModelType = {
	username: string
	firstName: string
	lastName: string
	middleName: string
	gender: string
	password: string
	role: string
	email: string
	profilePic: string
	active: boolean
	activationDate: Date
	address: {
		city: string
		street: string
		postalCode: string
		country: string
		zip: string
	}
	likedInstitutions: unknown[]
	referrals:unknown[]
	_doc: any
	passwordMatch: (password: string) => boolean
	// hashPassword: (password: string) => void
} & Document

export type WorkspaceModelType = {
	owner: unknown
	name: string
	admins: unknown[]
	creators: unknown[]
	members: unknown[]
	institutions: unknown[]
	active: boolean
	_doc: any
} & Document

export type AppointmentModelType = {
	duration: number
	author: unknown
	appointee: unknown
	startTime: Date
	endTime: Date
	title: string
	confirmed: boolean
	pending: boolean
	done: boolean
	_doc: any
} & Document

export type InstitutionModelType = {
	name: string
	description: string
	location: string
	comments: unknown[]
	likes: number
	shares: number
	author: unknown

	_doc: any
} & Document

export type CommentModelType = {
	author: unknown
	content: string
	_doc: any
} & Document
