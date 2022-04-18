import { loginUserUseCase, registerUserUseCase } from '../use-cases';

import makeBuildRegisterUserController from './register-user';
import makeBuildLoginUserController from './login-user';

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
