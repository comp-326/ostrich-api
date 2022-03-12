/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose"
/**
 * ****************** USER ********************
 */

import { IImageAsset } from "."

export type IUser = {
	username: string
	firstName: string
	lastName: string
	middleName: string
	gender: string
	firstTimeSignOn: boolean
	accountType: string
	password: string
	role: Record<string, any>
	email: string
	firstTimeSignOn: boolean
	profilePic: IImageAsset
	isActive: boolean
	status: "invited" | "pending" | "active"
	activationDate: Date
	availability: Record<string, any>
	middleName: string
	userType: string
	dateOfBirth: Date | string
	phoneNumber: string
	modeOfCommunication: "sms" | "email"
	note: string
	address: {
		city: string
		street: string
		postalCode: string
		country: string
		zip: string
	}
	likedInstitutions: Record<string, any>[]
	referrals: Record<string, any>[]
	_doc: any
	ActivationToken: {
		value: string
		isUsed: boolean
	}
	PasswordToken: {
		value: string
		isUsed: boolean
	}
}

export type IUserDocument = {
	[x: string]: any
	hashPassword: (password: string) => Promise<void>
	comparePassword: (password: string) => Promise<boolean>
} & IUser &
	mongoose.Document

export type IUserModel = {
	findByEmail: (email: string) => Promise<IUserDocument>
	findByEmailOrUsername: ({
		email,
		username,
	}: {
		email?: string
		username?: string
	}) => Promise<IUserDocument>
} & mongoose.Model<IUserDocument>
