import AuthRepository from "../AuthRepository"
import makeLoginUserByUseCase from "./login-user"
import makeRegisterUserUseCase from "./register-user"

const loginUserUseCase = makeLoginUserByUseCase({ userDB: AuthRepository })
const registerUserUseCase = makeRegisterUserUseCase({ userDB: AuthRepository })

export default Object.freeze({
	loginUserUseCase,
	registerUserUseCase,
})

export { loginUserUseCase, registerUserUseCase }

export type TodoUseCasesType =
	| typeof loginUserUseCase
	| typeof registerUserUseCase
