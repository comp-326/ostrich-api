import { ExpressError } from '@ostrich-app/common/errors/ExpressError';
import validateMongodbId from '@ostrich-app/utils/mongo/ObjectId-validator';
import createUser from '../entities';
import { IUserRepository } from '../interfaces';

export default function makeEditActivateUserUseCase({
	userDB
}: {
	userDB: IUserRepository;
}){
	return async function editActivateUserUserUseCase(id: string){
		if (!id) {
			throw new ExpressError({
				message: 'Please provide an id',
				statusCode: 400,
				data: {},
				status: 'warning'
			});
		}
		if (!validateMongodbId(id)) {
			throw new ExpressError({
				message: 'Please provide a valid user id',
				statusCode: 400,
				data: {},
				status: 'warning'
			});
		}
		const existing = await userDB.findById(id);
		if (!existing) {
			throw new ExpressError({
				message: 'User does not exist',
				statusCode: 404,
				data: {},
				status: 'warning'
			});
		}
		if (existing.isActive) {
			throw new ExpressError({
				message: 'User account already activated',
				statusCode: 400,
				status: 'warning',
				data: {}
			});
		}
		const user =await createUser({ ...existing._doc, isActive: true });
		await userDB.updateById(id, {
			email: user.getEmail(),
			password: user.getPassword(),
			dateOfBirth: user.getDateOfBirth(),
			firstName: user.getFirsName(),
			isActive: true,
			lastName: user.getLastName(),
			avatar: user.getAvatar()
		});

		return {...existing._doc, isActive: true,password: undefined};
	};
}
