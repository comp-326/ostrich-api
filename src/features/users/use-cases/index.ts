import { IUser } from '@ostrich-app/features/users/models/interfaces';
import userRoleModel from '@ostrich-app/features/userRoles/models';
import { IUserRepository, IUserUseCases } from '../interfaces';


export class UserUseCase implements IUserUseCases{
	private readonly repository: IUserRepository;

	constructor(repository: IUserRepository){
		this.repository = repository;
	}

	addNewUser = async (userData: IUser) => {
		const role = await userRoleModel.getDefaultRole();
		if (role) {

			const user = await this.repository.createUser({ ...userData, role });

			return user._doc;
		} else {
			await userRoleModel.InsertRoles();
			const defaultRole = await userRoleModel.getDefaultRole();
			const newUser = await this.repository.createUser({...userData,role:defaultRole});

			return newUser._doc;
		}
	};

	editUserProfile = async (userId: string, userData: IUser) => {
		const newUserData = await this.repository.updateById(userId,userData);

		return newUserData;
	};

	listUserById = async (id: string) => {
		const user = await this.repository.findById(id);

		return user;
	};

	listUserByEmail = async (email: string) => {
		const user = await this.repository.findByEmail(email);

		return user;
	};

	listUsers = async ({limit,offset}: { limit: number; offset: number; }) => {
		const users = await this.repository.find(limit,offset);

		return users;
	};

	activateUserAccount = async (email: string) => {
		const user = await this.repository.findByEmail(email);

		return user;
	};

	changeUserPassword = async (id:string,data: IUser) => {
		const user = await this.repository.updateById(id,data);

		return user;
	};

	softRemoveUser = async (id: string) => {
		const user = await this.repository.deleteById(id);

		return user;
	};

	hardRemoveUser = async (id: string) => {
		const user = await this.repository.deleteById(id);

		return user;
	};

	sendAccountActivationLink = async (email: string) => {
		const user = await this.repository.deleteById(email);

		return user;
	};

	sendPasswordResetLink = async (email: string) => {
		const user = await this.repository.deleteById(email);

		return user;
	};

}