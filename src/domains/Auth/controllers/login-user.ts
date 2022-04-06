import { ExpressError } from "@base/src/common/errors/ExpressError"
import { IAuthRequest } from "../interfaces"
import { loginUserUseCase } from "../use-cases"
import generateToken from "../utils/create-token"

export default function makeBuildLoginUserController({
	login,
}: {
	login: typeof loginUserUseCase
}) {
	return async function (httpRequest: IAuthRequest) {
		const { email, password } = httpRequest.body
		if (!email) {
			return new ExpressError("Email required", 400)
		}
		if (!password) {
			return new ExpressError("Password required", 400)
		}
		const { passwordMatch, user } = await login(email, password)

		if (!passwordMatch) {
			throw new ExpressError("Incorrect email or password", 401)
		}
		const AuthToken = generateToken(user._id,user.email)
		return { statusCode: 200, body: { user, AuthToken } }
	}
}
