import { ExpressError } from '@ostrich-app/common/errors/ExpressError';
import { IUser } from '@ostrich-app/features/users/models/interfaces';
import createUser from '@ostrich-app/features/users/entities';
import entity from '@ostrich-app/features/users/entities';
import { IUserRepository, IUserUseCases } from '../interfaces';


export class UserUseCase implements IUserUseCases{
	private readonly repository: IUserRepository;

	constructor(repository: IUserRepository){
		this.repository = repository;
	}

	addNewUser = async (userData: IUser) => {
		const newUser = await entity(userData);
		const existing = await this.repository.findByEmail(newUser.getEmail());
		if(existing) {
			throw new ExpressError({
				message: 'User already exists',
				status: 'warning',
				statusCode: 409,
				data: {
					email: newUser.getEmail()}


			});
		}
		const user = await this.repository.createUser({ ...userData});

		return user;
		
	};

	editUserProfile = async (userId: string, userData: IUser) => {
		const newUserData = await this.repository.updateById(userId, userData);

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

	listUsers = async ({ limit, offset }: { limit: number; offset: number; }) => {
		const users = await this.repository.find(limit, offset);
		if(users.length === 0) {
			throw new ExpressError({
				message: 'No users found',
				status: 'warning',
				statusCode: 404,
				data: {
					limit,
					offset
				}
			});
		}

		return users;
	};

	activateUserAccount = async (email: string) => {
		if(!email) {
			throw new ExpressError({
				message: 'Email is required',
				status: 'warning',
				statusCode: 400,
				data: {
					email
				}
			});
		}
		const existing = await this.repository.findByEmail(email);
		if(!existing) {
			throw new ExpressError({
				message: 'User not found',
				status: 'warning',
				statusCode: 404,
				data: {
					email
				}
			});
		}
		if(existing.isActive) {
			throw new ExpressError({
				message: 'User account already activated',
				status: 'warning',
				statusCode: 409,
				data: {
				}
			});
		}
		const updated = await createUser({...existing, isActive: true});
		const user = await this.repository.updateById(existing._id, {
			email: updated.getEmail(),
			isActive: updated.getIsActive(),
			firstName: updated.getFirsName(),
			lastName: updated.getLastName(),
			gender:updated.getGender(),
			password:updated.getPassword(),
			bio:updated.getBio(),
			profilePicture:updated.getProfilePic()
		});

		return user;
	};

	changeUserPassword = async (id: string, data: IUser) => {
		const user = await this.repository.updateById(id, data);

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