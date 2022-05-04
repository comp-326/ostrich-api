/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRequest, IResponse } from '@ostrich/src/common/types';

export interface IUserConroller {
	/**
	 * @param {IRequest} req
	 * @param {IResponse} res
	 */
	softDeleteUser: (req: IRequest, res: IResponse) => Promise<any>;
	deleteUser: (req: IRequest, res: IResponse) => Promise<any>;
	findUserByEmail: (req: IRequest, res: IResponse) => Promise<any>;
	findUserById: (req: IRequest, res: IResponse) => Promise<any>;
	getAccountActivationLink: (req: IRequest, res: IResponse) => Promise<any>;
	getPasswordResetLink: (req: IRequest, res: IResponse) => Promise<any>;
	resetAccountPassword: (req: IRequest, res: IResponse) => Promise<any>;
	activateAccount: (req: IRequest, res: IResponse) => Promise<any>;
	findUsers: (req: IRequest, res: IResponse) => Promise<any>;
	updateAccount: (req: IRequest, res: IResponse) => Promise<any>;
	updatePassword: (req: IRequest, res: IResponse) => Promise<any>;
}
