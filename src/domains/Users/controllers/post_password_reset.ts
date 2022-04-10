import { mailTransport } from "@base/src/Services/MailService"
import "reflect-metadata"
import { IUserRequest } from "../interfaces"
import { requestPasswordReset } from "../use-cases"
import sendPasswordResetLink from "../utils/mail/sendPasswordResetLink"

export default function makeBuildPostRequestPasswordResetController({
	requestPassword,
}: {
	requestPassword: typeof requestPasswordReset
}) {
	return async function postPasswordReset(httpRequest: IUserRequest) {
		const user = await requestPassword(httpRequest.body.email)
		if (user) {
			const sendLink = await sendPasswordResetLink({
				mailer: mailTransport,
			})(user.email, user.firstName, user.lastName, user._id)
			if (sendLink)
				return {
					statusCode: 200,
					body: {
						message: "Check your email to change your password",
					},
				}
		}
		return {
			statusCode: 400,
			body: { message: "Something went wrong" },
		}
	}
}
