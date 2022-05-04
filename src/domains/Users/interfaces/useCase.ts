/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUser } from '.';


export interface IUserUseCases {

	addNewUser: (userData: IUser) => Promise<any>;
	editUserProfile: (userData: Partial<IUser>) => Promise<any>;
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
	softRemoveUser: () => Promise<any>;
	hardRemoveUser: () => Promise<any>;
	sendAccountActivationLink: () => Promise<any>;
	sendPasswordResetLink: () => Promise<any>;
}
