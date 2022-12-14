/* eslint-disable @typescript-eslint/no-explicit-any */
import EventBus from '@ostrich-app/services/eventBus';
import { ExpressError } from '@ostrich-app-common/errors/ExpressError';
import { IUser } from '@ostrich-app-features/users/models/interfaces';
import { JWTPayloadType } from '@ostrich-app/common/types';
import { appEvents } from '@ostrich-app/constants/events';
import createUser from '@ostrich-app-features/users/entities';
import { deleteFile } from '@ostrich-app-utils/fileSystem';
import entity from '@ostrich-app-features/users/entities';
import tokenGEN from '@ostrich-app/utils/jwt/tokenGEN';
import validateMongodbId from '@ostrich-app-utils/mongo/ObjectId-validator';
import { IUserRepository, IUserUseCases } from '../interfaces';


export class UserUseCase implements IUserUseCases {
	private readonly repository: IUserRepository;

	constructor(repository: IUserRepository) {
		this.repository = repository;
	}

	editUserProfilePic = async (userId: string, userData: IUser & { file: Express.Multer.File }) => {
		if (!userId && userData.file) {
			await deleteFile(userData.file.path);
			throw new ExpressError({
				data: {},
				message: 'User id not provided',
				status: 'error',
				statusCode: 400
			});
		}
		if (!validateMongodbId(userId) && userData.file) {
			await deleteFile(userData.file.path);
			throw new ExpressError({
				data: {},
				message: 'Please provide a valid user id',
				status: 'error',
				statusCode: 400
			});
		}

		return { done: userData };
	};

	addNewUser = async (userData: IUser) => {
		const { getBio, getEmail, getFirstName, getGender, getIsActive, getIsDelete, getLastName, getPassword, getProfilePic, getRole } = await entity(userData);
		const existing = await this.repository.findByEmail(getEmail());
		if (existing) {
			throw new ExpressError({
				message: 'User already exists',
				status: 'warning',
				statusCode: 409,
				data: {
					email: getEmail()
				}

			});
		}
		const queue = new EventBus(appEvents.activateAccount);
		const user = await this.repository.createUser({
			email: getEmail(),
			firstName: getFirstName(),
			lastName: getLastName(),
			password: getPassword(),
			gender: getGender(),
			bio: getBio(),
			isActive: getIsActive(),
			isDeleted: getIsDelete(),
			profilePicture: getProfilePic(),
			role: getRole()
		});
		const token = await tokenGEN.generateSimpleToken({ userId: user._id, email: getEmail() });
		queue.sendToQueue(JSON.stringify({
			name: `${getFirstName()} ${getLastName()}`,
			email: getEmail(),
			token

		}));

		return user;

	};

	sendAccountActivationLink = async (email: string) => {
		if (!email) {
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
		if (!existing) {
			throw new ExpressError({
				message: 'User not found',
				status: 'warning',
				statusCode: 404,
				data: {
					email
				}
			});
		}
		if (existing.isActive) {
			throw new ExpressError({
				message: 'User account already activated',
				status: 'warning',
				statusCode: 409,
				data: {
				}
			});
		}
		const queue = new EventBus('activateAccount');
		const token = await tokenGEN.generateSimpleToken({ userId: existing._id, email: existing.email });
		queue.sendToQueue(JSON.stringify({
			name: `${existing.firstName} ${existing.lastName}`,
			email: existing.email,
			token

		}));

		return existing;
	};


	editUserProfile = async (userId: string, userData: IUser) => {
		if (!userId) {
			throw new ExpressError({
				message: 'User id not provided',
				status: 'error',
				statusCode: 400,
				data: {
					userId: userId
				}
			});
		}
		if (!validateMongodbId(userId)) {
			throw new ExpressError({
				message: 'Please provide a valid user id',
				status: 'error',
				statusCode: 400,
				data: {}
			});

		}
		const existing = await this.repository.findById(userId);
		
		if(!existing){
			throw new ExpressError({
				message: 'User not found',
				status: 'error',
				statusCode: 404,
				data: {}
			});
		}
		const { getBio, getEmail, getFirstName, getIsActive,getGender, getLastName, getPassword, getProfilePic } = await createUser({ ...existing._doc,...userData });
		const user = await this.repository.updateById(existing._id, {
			email: getEmail(),
			isActive: getIsActive(),
			firstName: getFirstName(),
			lastName: getLastName(),
			gender: getGender(),
			password: getPassword(),
			bio: getBio(),
			profilePicture: getProfilePic()
		});


		return user;
	};

	listUserById = async (id: string) => {
		if (!id) {
			throw new ExpressError({
				message: 'User id not provided',
				status: 'error',
				statusCode: 400,
				data: {
					userId: id
				}
			});
		}
		if (!validateMongodbId(id)) {
			throw new ExpressError({
				message: 'Please provide a valid user id',
				status: 'error',
				statusCode: 400,
				data: {}
			});
		}
		const user= await this.repository.findById(id);
		if(!user){
			throw new ExpressError({
				message: 'User profile not found',
				status: 'error',
				statusCode: 404,
				data: {}
			});
		}
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const {password:_docs,...props}=user._doc;

		return props;
	};

	listUserByEmail = async (email: string) => {
		if (!email) {
			throw new ExpressError({
				message: 'Email not provided',
				status: 'error',
				statusCode: 400,
				data: {
					email: email
				}
			});
		}

		const user = await this.repository.findByEmail(email);
		if (!user) {
			throw new ExpressError({
				message: 'User not found',
				status: 'warning',
				statusCode: 404,
				data: {
				}
			});
		}
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const {password:_do,...props}=user._doc;

		return props;
	};

	listUsers = async ({ limit, offset }: { limit: number; offset: number; }) => {
		const users = await this.repository.find(limit, offset);
		if (users.length === 0) {
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

	activateUserAccount = async (token: string) => {
		const { userId ,email} =await tokenGEN.decodeSimpleToken(token) as unknown as JWTPayloadType;
		if (!email) {
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
		if (!existing) {
			throw new ExpressError({
				message: 'User not found',
				status: 'warning',
				statusCode: 404,
				data: {
					email
				}
			});
		}
		if (existing.isActive) {
			throw new ExpressError({
				message: 'User account already activated',
				status: 'warning',
				statusCode: 409,
				data: {
				}
			});
		}
		if (existing.isDeleted) {
			throw new ExpressError({
				message: 'User account has been deleted',
				status: 'warning',
				statusCode: 409,
				data: {
				}
			});
		}
		if (!token) {
			throw new ExpressError({
				message: 'Token is required',
				status: 'warning',
				statusCode: 400,
				data: {
					token
				}
			});
		}
		if (!userId) {
			throw new ExpressError({
				message: 'Token is invalid',
				status: 'warning',
				statusCode: 400,
				data: {
					token
				}
			});
		}
		if (userId !== existing.id) {
			throw new ExpressError({
				message: 'Token is invalid',
				status: 'warning',
				statusCode: 400,
				data: {
					token
				}
			});
		}

		const { getBio, getEmail, getFirstName, getGender, getLastName, getPassword, getProfilePic } = await createUser({ ...existing._doc, isActive: true });
		const user = await this.repository.updateById(existing._id, {
			email: getEmail(),
			isActive: true,
			firstName: getFirstName(),
			lastName: getLastName(),
			gender: getGender(),
			password: getPassword(),
			bio: getBio(),
			profilePicture: getProfilePic()
		});

		return user;
	};

	resetPassword = async (token: string, data: { password: string, confirmPassword: string }) => {
		if (!token) {
			throw new ExpressError({
				message: 'Token is required',
				status: 'warning',
				statusCode: 400,
				data: {
					token
				}
			});
		}
		const {userId} =await tokenGEN.decodeSimpleToken(token) as unknown as JWTPayloadType;
		
		if (!userId) {
			throw new ExpressError({
				message: 'Token is invalid',
				status: 'warning',
				statusCode: 400,
				data: {
					token
				}
			});
		}
		const existing = await this.repository.findById(userId);
		if (!existing) {
			throw new ExpressError({
				message: 'User not found',
				status: 'warning',
				statusCode: 404,
				data: {
					userId
				}
			});
		}
		if (existing.isDeleted) {
			throw new ExpressError({
				message: 'User account has been deleted',
				status: 'warning',
				statusCode: 409,
				data: {
				}
			});
		}
		if (!existing.isActive) {
			throw new ExpressError({
				message: 'User account not activated',
				status: 'warning',
				statusCode: 409,
				data: {
				}
			});
		}
		if (!data.password) {
			throw new ExpressError({
				message: 'Password is required',
				status: 'warning',
				statusCode: 400,
				data: {
				}
			});
		}
		if (!data.confirmPassword) {
			throw new ExpressError({
				message: 'Confirm password is required',
				status: 'warning',
				statusCode: 400,
				data: {
				}
			});
		}
		if (data.password !== data.confirmPassword) {
			throw new ExpressError({
				message: 'Passwords do not match',
				status: 'warning',
				statusCode: 400,
				data: {
				}
			});
		}
		
		const { getBio, getEmail, getFirstName, getGender, getLastName, getPassword, getProfilePic } = await createUser({ ...existing._doc, password: data.password });
		const user = await this.repository.updateById(existing._id, {
			email: getEmail(),
			isActive: true,
			firstName: getFirstName(),
			lastName: getLastName(),
			gender: getGender(),
			password: getPassword(),
			bio: getBio(),
			profilePicture: getProfilePic()
		});
	
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


	sendPasswordResetLink = async (email: string) => {
		if (!email) {
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
		if (!existing) {
			throw new ExpressError({
				message: 'User not found',
				status: 'warning',
				statusCode: 404,
				data: {
					email
				}
			});
		}
		if (!existing.isActive) {
			throw new ExpressError({
				message: 'User account not activated',
				status: 'warning',
				statusCode: 409,
				data: {
				}
			});
		}
	
		const queue = new EventBus('resetPassword');
		const token = await tokenGEN.generateSimpleToken({ userId: existing._id, email: existing.email });
		queue.sendToQueue(JSON.stringify({
			name: `${existing.firstName} ${existing.lastName}`,
			email: existing.email,
			token

		}));


		return existing;
	};

}