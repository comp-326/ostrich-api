/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IUser {
	firstName: string
	lastName: string
	dateOfBirth: string
	email: string
	password: string
	role?: Record<string, any>
	isActive: boolean
	profilePic?: { public_id: string; url: string }
	passToken: { value: string; used: boolean }
	activationToken: { value: string; used: boolean }
}

export interface IUserRequest {
	params: any
	body: any
	query: any
	headers: any
	files?: any
	file?: any
}

export interface IUserRepository {
	createUser: (data: IUser) => Promise<any>
	findByEmail: (title: string) => Promise<any>
	findById: (id: string) => Promise<any>
	find: (limit: number, page: number) => Promise<any>
	updateById: (id: string, data: IUser) => Promise<any>
	deleteById: (id: string) => Promise<any>
}

export type PasswordValidatorType = {
	props: { [x: string]: string }
	fields: { fieldName: string; name: string }[]
}
export interface IUserValidator {
	isValidEmail: (email: string) => boolean
	isValidPassword: (body: PasswordValidatorType) => {
		ok: boolean
		errors: string
	}
}

export interface IPassword {
	hashPassword: (password: string) => Promise<string>
	comparePassword: (password: string, hash: string) => Promise<boolean>
}
