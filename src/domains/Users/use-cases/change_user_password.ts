import { ExpressError } from '@base/src/common/errors/ExpressError';
import createUser from '../entities';
import { IUser, IUserRepository } from '../interfaces';

export default function makeEditUserPasswordUseCase({
	userDB
}: {
	userDB: IUserRepository;
}) {
	return async function editUserUserPasswordUseCase(
		email: string,
		data: IUser
	) {
		if (!email) {
			throw new ExpressError({
				message: 'Please provide an email',
				statusCode: 400,
				data: {},
				status: 'warning'
			});
		}

		const existing = await userDB.findByEmail(email);
		console.log('User', existing);

		if (!existing) {
			throw new ExpressError({
				message: 'User does not exist',
				statusCode: 404,
				data: {},
				status: 'warning'
			});
		}
		const user = createUser({ ...existing, ...data });
		const edited = await userDB.updateById(existing._id, {
			email: user.getEmail(),
			password: user.getPassword(),
			dateOfBirth: user.getDateOfBirth(),
			firstName: user.getFirsName(),
			isActive: user.getIsActive(),
			lastName: user.getLastName(),
			avatar: user.getAvatar()
		});

		return { ...existing._doc, ...edited };
	};
}
