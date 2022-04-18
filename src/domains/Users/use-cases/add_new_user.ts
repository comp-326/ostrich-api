import { ExpressError } from '@base/src/common/errors/ExpressError';
import createUser from '../entities';
import { IUser, IUserRepository } from '../interfaces';

export default function makeAddUserUseCase({
	userDB
}: {
	userDB: IUserRepository;
}) {
	return async function addUserUseCase(userInfo: IUser) {
		const user = createUser(userInfo);
		const existing = await userDB.findByEmail(user.getEmail());

		if (existing) {
			throw new ExpressError({
				message: 'User already exists',
				statusCode: 400,
				status: 'warning',
				data: {}
			});
		}
		const created = await userDB.createUser({
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
		return created;
	};
}
