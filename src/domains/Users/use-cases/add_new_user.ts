/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUser, IUserRepository } from '@ostrich-app/domains/Users/interfaces';
import { ExpressError } from '@ostrich-app/common/errors/ExpressError';
import { IUserData } from '@ostrich-app/domains/Users/interfaces';
import createUser from '@ostrich-app/domains/Users/entities';

export default function makeAddUserUseCase({
	userDB
}: {
	userDB: IUserRepository;
}){
	return async function addUserUseCase(userInfo: IUser){
		const user = await createUser(userInfo);
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
