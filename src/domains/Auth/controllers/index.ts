import { loginUserUseCase, registerUserUseCase } from '@ostrich-app/domains/Auth/use-cases';

import makeBuildRegisterUserController from '@ostrich-app/domains/Auth/controllers/register-user';
import makeBuildLoginUserController from '@ostrich-app/domains/Auth/controllers/login-user';

const postUser = makeBuildRegisterUserController({
	create: registerUserUseCase
});
const loginUser = makeBuildLoginUserController({ login: loginUserUseCase });

export default Object.freeze({
	loginUser,
	postUser
});

export { postUser, loginUser };

export type UserControllerType = typeof loginUser | typeof postUser;
