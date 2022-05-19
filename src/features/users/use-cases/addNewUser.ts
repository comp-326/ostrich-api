import EventBus from '@ostrich-app/services/eventBus';
import { ExpressError } from '@ostrich-app/common/errors/ExpressError';
import { IUser } from '../models/interfaces';
import { IUserRepository } from '../interfaces';
import entity from './../entities';
import tokenGEN from '@ostrich-app/utils/jwt/tokenGEN';

export  function makeAddNewUser({ repository }: { repository: IUserRepository }) {
	return async (userData: IUser) => {
		const { getBio, getEmail, getFirstName, getGender, getIsActive, getIsDelete, getLastName, getPassword, getProfilePic, getRole } = await entity(userData);
		const existing = await repository.findByEmail(getEmail());
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
		const queue = new EventBus('activateAccount');
		const user = await repository.createUser({
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
}