import { ExpressError } from "@base/src/common/errors/ExpressError"
import { IAuthRequest } from "../interfaces"
import { loginUserUseCase } from "../use-cases"

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
		const { user, passwordMatch } = await login(email, password)

		if (!user) {
			throw new ExpressError(
				"User account does not exist create one",
				404,
			)
		}
		if (!passwordMatch) {
			throw new ExpressError("Incorrect email or password", 400)
		}
		return { statusCode: 200, body: user }
	}
}
