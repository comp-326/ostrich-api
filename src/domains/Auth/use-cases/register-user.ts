import { ExpressError } from '@base/src/common/errors/ExpressError';
import createUser from '../entities';
import { IUser, IAuthRepository } from '../interfaces';

export default function makeRegisterUserUseCase({
	userDB
}: {
	userDB: IAuthRepository;
}) {
	return async function registerUserUseCase(userInfo: IUser) {
		const user = await createUser(userInfo);
		const existing = await userDB.findByEmail(user.getEmail());
		if (existing) {
			throw new ExpressError({
				message: 'User email already exists',
				data: {},
				status: 'warning',
				statusCode: 409
			});
		}
		if (userInfo.password !== userInfo.confirmPassword) {
			throw new ExpressError({
				message: 'Passwords do not match',
				data: {},
				status: 'warning',
				statusCode: 400
			});
		}
		const created = await userDB.createUser({
			email: user.getEmail(),
			password: user.getPassword(),
			dateOfBirth: user.getDateOfBirth(),
			firstName: user.getFirsName(),
			isActive: user.getIsActive(),
			lastName: user.getLastName(),
			avatar: user.getAvatar()
		});
		return created;
	};
}
