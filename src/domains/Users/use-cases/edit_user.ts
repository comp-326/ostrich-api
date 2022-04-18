import { ExpressError } from '@base/src/common/errors/ExpressError';
import validateMongodbId from '@base/src/utils/mongo/ObjectId-validator';
import createUser from '../entities';
import { IUser, IUserRepository } from '../interfaces';

export default function makeEditUserUseCase({
	userDB
}: {
	userDB: IUserRepository;
}) {
	return async function editUserUserUseCase(id: string, data: IUser) {
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
		const user = createUser({ ...existing, ...data });
		const edited = await userDB.updateById(id, {
			email: user.getEmail(),
			password: user.getPassword(),
			activationToken: user.getActivationToken(),
			dateOfBirth: user.getDateOfBirth(),
			firstName: user.getFirsName(),
			isActive: user.getIsActive(),
			lastName: user.getLastName(),
			passToken: user.getPasswordToken(),
			profilePic: user.getProfilePicture()
		});

		return { ...existing._doc, ...edited };
	};
}
