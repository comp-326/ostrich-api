/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-explicit-any */

import IRequest from '@ostrich/src/common/interfaces/request';
import { IResponse } from '@ostrich/src/common/types';


type FilesType =
	| {
			[fieldname: string]: Express.Multer.File[];
	  }
	| Express.Multer.File[]
	| undefined;
export interface IUser {
	firstName: string;
	lastName: string;
	dateOfBirth: string;
	email: string;
	password: string;
	role?: Record<string, any>;
	isActive: boolean;
	avatar: string;
}

export interface IUserRequest {
	params: any;
	body: any;
	query: any;
	headers: any;
	files?: FilesType;
	file?: Express.Multer.File | undefined;
}

export interface IUserRepository {
	createUser: (data: IUser) => Promise<any>;
	findByEmail: (title: string) => Promise<any>;
	findById: (id: string) => Promise<any>;
	find: (limit: number, page: number) => Promise<any>;
	updateById: (id: string, data: IUser) => Promise<any>;
	deleteById: (id: string) => Promise<any>;
}

export type PasswordValidatorType = {
	props: { [x: string]: string };
	fields: { fieldName: string; name: string }[];
};
export interface IUserValidator {
	isValidEmail: (email: string) => boolean;
	isValidPassword: (body: PasswordValidatorType) => {
		ok: boolean;
		errors: string;
	};
}

export interface IPassword {
	hashPassword: (password: string) => Promise<string>;
	comparePassword: (password: string, hash: string) => Promise<boolean>;
}


export  interface IUserController {
	/**
	 * @param {IRequest} req
	 * @param {IResponse} res
	 */
	softDeleteUser: (req: IRequest, res: IResponse) => Promise<any>;
	createUser: (req: IRequest, res: IResponse) => Promise<any>;
	deleteUser: (req: IRequest, res: IResponse) => Promise<any>;
	findUserByEmail: (req: IRequest, res: IResponse) => Promise<any>;
	findUserById: (req: IRequest, res: IResponse) => Promise<any>;
	getAccountActivationLink: (req: IRequest, res: IResponse) => Promise<any>;
	getPasswordResetLink: (req: IRequest, res: IResponse) => Promise<any>;
	resetAccountPassword: (req: IRequest, res: IResponse) => Promise<any>;
	activateAccount: (req: IRequest, res: IResponse) => Promise<any>;
	findUsers: (req: IRequest, res: IResponse) => Promise<any>;
	updateAccount: (req: IRequest, res: IResponse) => Promise<any>;
	updateProfilePic: (req: IRequest, res: IResponse) => Promise<any>;
	updatePassword: (req: IRequest, res: IResponse) => Promise<any>;
}

export type IUserData =
	| 'email'
	| 'dateOfBirth'
	| 'firstName'
	| 'lastName'
	| 'isActive'
	| 'avatar'
	| '_id';

export interface IUserUseCases {

		addNewUser: (userData: IUser) => Promise<any>;
		editUserProfile: (userId:string,userData: Partial<IUser>) => Promise<any>;
		listUserById: (id: string) => Promise<any>;
		listUserByEmail: (email: string) => Promise<any>;
		listUsers: (query: {
			limit: number;
			offset: number;
			query?: any;
		}) => Promise<any>;
		activateUserAccount: (email: string) => Promise<any>;
		changeUserPassword: (
			data: Pick<IUser, 'password'> & { confirmPassword: string }
		) => Promise<any>;
		softRemoveUser: (id:string) => Promise<any>;
		hardRemoveUser: (id:string) => Promise<any>;
		sendAccountActivationLink: (email:string) => Promise<any>;
		sendPasswordResetLink: (email:string) => Promise<any>;
	}
	