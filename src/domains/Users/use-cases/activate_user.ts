import { ExpressError } from '@common/errors/ExpressError';
import validateMongodbId from '@utils/mongo/ObjectId-validator';
import createTodo from '../entities';
import { IUser, IUserRepository } from '../interfaces';

export default function makeEditActivateUserUseCase({
	userDB
}: {
	userDB: IUserRepository;
}) {
	return async function editActivateUserUserUseCase(id: string, data: IUser) {
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
		const user = createTodo({ ...existing._doc, isActive: true });
		const edited = await userDB.updateById(id, {
			email: user.getEmail(),
			password: user.getPassword(),
			dateOfBirth: user.getDateOfBirth(),
			firstName: user.getFirsName(),
			isActive: true,
			lastName: user.getLastName(),
			avatar: user.getAvatar()
		});

		return { ...existing._doc, ...edited };
	};
}
