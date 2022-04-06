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
	profilePic?: { public_id: string; url: string }
	passToken: { value: string; used: boolean }
	activationToken: { value: string; used: boolean }
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
