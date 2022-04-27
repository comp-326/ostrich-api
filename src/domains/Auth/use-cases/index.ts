import AuthRepository from '@ostrich-domains/Auth/AuthRepository';
import makeLoginUserByUseCase from '@ostrich-domains/Auth/use-cases/login-user';
import makeRegisterUserUseCase from '@ostrich-domains/Auth/use-cases/register-user';

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
