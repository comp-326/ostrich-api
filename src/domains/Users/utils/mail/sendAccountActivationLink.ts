import tokenGenerator from "@root/helpers/tokenGenerator"
import { EmailActivationTemp } from "@root/Services/MailService/templates"
import mailTransport from "@root/Services/MailService/transport"
import { EMAIL_ACCOUNT } from "@root/config"
import createLinks from "@root/helpers/createLinks"
export default function sendAccountActivationLink({
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

		const link = createLinks.createAccountActivationLink({token})
		const template = EmailActivationTemp({
			firstName,
			lastName,
			link,
		})

		try {
			const res = await mailer.sendMail({
				to: userEmail,
				from: EMAIL_ACCOUNT,
				subject: "Activate your account",
				html: template,
			})
			res && (sent = true)
			return sent
		} catch (err) {
			return false
		}
	}
}
