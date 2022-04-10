import tokenGenerator from "@base/src/helpers/tokenGenerator"
import { ForgotPasswordTemp } from "@base/src/Services/MailService/templates"
import mailTransport from "@root/Services/MailService/transport"
import { EMAIL_ACCOUNT } from "@root/config"
import createLinks from "@base/src/helpers/createLinks"
export default function sendPasswordResetLink({
	mailer,
}: {
	mailer: typeof mailTransport
}) {
	return async function (
		userEmail: string,
		firstName: string,
		lastName: string,
		userId: string,
	) {
		let sent = false
		const token = tokenGenerator.generatePasswordResetToken({ userId })(
			"24h",
		)

		const link = createLinks.createForgotPasswordLink(token)
		const template = ForgotPasswordTemp({
			firstName,
			lastName,
			link,
		})

		try {
			const res = await mailer.sendMail({
				to: userEmail,
				from: EMAIL_ACCOUNT,
				subject: "Reset your password",
				html: template,
			})
			res && (sent = true)
			return sent
		} catch (err) {
			return false
		}
	}
}
