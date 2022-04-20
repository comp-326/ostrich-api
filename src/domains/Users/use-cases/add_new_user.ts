/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExpressError } from '@base/src/common/errors/ExpressError';
import createUser from '../entities';
import { IUser, IUserRepository } from '../interfaces';
import { IUserData } from '../interfaces/IUserData';

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
			dateOfBirth: user.getDateOfBirth(),
			firstName: user.getFirsName(),
			isActive: user.getIsActive(),
			lastName: user.getLastName(),
			avatar: user.getAvatar()
		});
		
		return created as Pick<any, IUserData>;
	};
}
