/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IUser {
	[x:string]:any
	firstName: string
	lastName: string
	dateOfBirth: string
	email: string
	password: string
	role?: Record<string, any>
	isActive: boolean
	avatar?: string
}

export interface IAuthRequest {
	params: any
	body: any
	query: any
	headers: any
	files?: any
	file?: any
}

export interface IAuthRepository {
	login: (
		email: string,
		password: string,
	) => Promise<any>
	createUser: (user: IUser) => Promise<any>
	findByEmail: (email: string) => Promise<any>
}
