import AuthRepository from '@ostrich-app/domains/Auth/AuthRepository';
import makeLoginUserByUseCase from '@ostrich-app/domains/Auth/use-cases/login-user';
import makeRegisterUserUseCase from '@ostrich-app/domains/Auth/use-cases/register-user';

const loginUserUseCase = makeLoginUserByUseCase({ userDB: AuthRepository });
const registerUserUseCase = makeRegisterUserUseCase({ userDB: AuthRepository });

export default Object.freeze({
	loginUserUseCase,
	registerUserUseCase
});

export { loginUserUseCase, registerUserUseCase };

export type TodoUseCasesType =
	| typeof loginUserUseCase
	| typeof registerUserUseCase;
