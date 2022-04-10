import { ExpressError } from "@base/src/common/errors/ExpressError"
import { IAuthRepository } from "../interfaces"

export default function makeLoginUserByUseCase({
	userDB,
}: {
	userDB: IAuthRepository
}) {
	return async function loginUserUseCase(email: string, password: string) {
		if (!email) {
			throw new ExpressError("Email required", 400)
		}
		if (!password) {
			throw new ExpressError("Password required", 400)
		}
		const existing = await userDB.findByEmail(email)
		if (!existing) {
			throw new ExpressError("Account does not exist", 404)
		}
		const auth = await userDB.login(email, password)

		return auth
	}
}
