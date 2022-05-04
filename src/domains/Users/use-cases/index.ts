import { IUser, IUserRepository, IUserUseCases } from '../interfaces';


export class UserUseCase implements IUserUseCases{
	protected repository:IUserRepository;
	constructor(repository:IUserRepository){
		this.repository = repository;
	}
	addNewUser=async (userData: IUser) => {
		return {};
	};
	editUserProfile=async (userId: string, userData: Partial<IUser>) => {
		return {};
	};
	listUserById=async (id: string) => {
		return {};
	};
	listUserByEmail=async (email: string) => {
		return {};
	};
	listUsers=async (query: { limit: number; offset: number; query?: any; }) => {
		return {};
	};
	activateUserAccount=async (email: string) => {
		return {};
	};
	changeUserPassword=async (data: Pick<IUser, 'password'> & { confirmPassword: string; }) => {
		return {};
	};
	softRemoveUser=async (id: string) => {
		return {};
	};
	hardRemoveUser=async (id: string) => {
		return {};
	};
	sendAccountActivationLink=async (email: string) => {
		return {};
	};
	sendPasswordResetLink=async (email: string) => {
		return {};
	};
	
}