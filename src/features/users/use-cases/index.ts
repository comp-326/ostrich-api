/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExpressError } from '@ostrich-app/common/errors/ExpressError';
import { IUser } from '@ostrich-app/features/users/models/interfaces';
import createUser from '@ostrich-app/features/users/entities';
import { deleteFile } from '@ostrich-app/utils/fileSystem';
import entity from '@ostrich-app/features/users/entities';
import validateMongodbId from '@ostrich-app/utils/mongo/ObjectId-validator';
import { IUserRepository, IUserUseCases } from '../interfaces';


export class UserUseCase implements IUserUseCases{
	private readonly repository: IUserRepository;

	constructor(repository: IUserRepository){
		this.repository = repository;
	}

	editUserProfilePic=async (userId: string, userData: IUser & {file:Express.Multer.File}) => {
		if(!userId && userData.file) {
			await deleteFile(userData.file.path);
			throw new ExpressError({
				data:{},
				message:'User id not provided',
				status:'error',
				statusCode:400
			});
		}
		if(!validateMongodbId(userId) && userData.file) {
			await deleteFile(userData.file.path);
			throw new ExpressError({
				data:{},
				message:'Please provide a valid user id',
				status:'error',
				statusCode:400
			});
		}

		return {done:userData};
	};

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
		if(!userId) {
			throw new ExpressError({
				message: 'User id not provided',
				status: 'error',
				statusCode: 400,
				data: {
					userId: userId}
			});
		}
		if(!validateMongodbId(userId)) {
			throw new ExpressError({
				message: 'Please provide a valid user id',
				status: 'error',
				statusCode: 400,
				data: {}
			});
		
		}

		const newUserData = await this.repository.updateById(userId, userData);

		return newUserData;
	};

	listUserById = async (id: string) => {
		const user = await this.repository.findById(id);

		return user;
	};

	listUserByEmail = async (email: string) => {
		const user = await this.repository.findByEmail(email);
		if(!user) {
			throw new ExpressError({
				message: 'User not found',
				status: 'warning',
				statusCode: 404,
				data: {
				}
			});}

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

	changeUserPassword = async (id: string, data: any ) => {
		if(!data.password) {
			throw new ExpressError({
				message: 'Password is required',
				status: 'warning',
				statusCode: 400,
				data: {
					password: data.password
				}
			});
		}
		if(data.password!==data.confirmPassword as any) {
			throw new ExpressError({
				message: 'Passwords do not match',
				status: 'warning',
				statusCode: 400,
				data: {
					password: data.password,
					confirmPassword: data.confirmPassword
				}
			});
		}
		const user = await this.repository.updateById(id, data);

		return user;
	};

	softRemoveUser = async (id: string) => {
		const user = await this.repository.softDeleteUser(id);

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