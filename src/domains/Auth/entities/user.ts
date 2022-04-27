import { ExpressError } from '@ostrich-common/errors/ExpressError';
import { generateGravatarUrl } from '@ostrich-common/gravatar';
import { IPassword, IUserValidator } from '@ostrich-domains/Users/interfaces';
import { IUser } from '@ostrich-domains/Auth/interfaces';

export default function makeCreateUserEntity({
	validator,
	passwordUtil
}: {
	validator: IUserValidator;
	passwordUtil: IPassword;
}) {
	return async function createUser({
		dateOfBirth,
		email,
		firstName,
		lastName,
		password,
		avatar
	}: IUser) {
		const { isValidEmail, isValidPassword } = validator;
		const { hashPassword } = passwordUtil;
		if (!isValidEmail(email)) {
			throw new ExpressError({
				message: 'Please provide a valid email',
				statusCode: 400,
				status: 'warning',
				data: {}
			});
		}
		if (!firstName) {
			throw new ExpressError({
				message: 'First name required',
				data: {},
				statusCode: 400,
				status: 'warning'
			});
		}
		if (!lastName) {
			throw new ExpressError({
				message: 'Last name required',
				data: {},
				status: 'warning',
				statusCode: 400
			});
		}
		if (!password) {
			throw new ExpressError({
				message: 'Password required',
				data: {},
				status: 'warning',
				statusCode: 400
			});
		}
		if (password.length < 40) {
			const { ok, errors } = isValidPassword({
				props: { firstName, lastName, password },
				fields: [
					{ fieldName: 'firstName', name: 'First name' },
					{ fieldName: 'email', name: 'Email address' },
					{ fieldName: 'lastName', name: 'Last name' }
				]
			});
			if (!ok) {
				throw new ExpressError({
					message: 'Invalid password',
					statusCode: 400,
					data: errors.replace(/[\t]/, '').trim().split(/\n/),
					status: 'warning'
				});
			}
			password = await hashPassword(password);
		}
		const profile = avatar ? avatar : generateGravatarUrl(email);
		return Object.freeze({
			getFirsName: () => firstName,
			getLastName: () => lastName,
			getDateOfBirth: () => dateOfBirth,
			getIsActive: () => false,
			getAvatar: () => profile,
			getPassword: () => password,
			getEmail: () => email
		});
	};
}
