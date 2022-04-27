import nodeMailer from 'nodemailer';
import { htmlToText } from 'nodemailer-html-to-text';
// eslint-disable-next-line no-unused-vars
import { EMAIL_ACCOUNT, EMAIL_PASSWORD } from '@ostrich-config';

const mailTransport = nodeMailer.createTransport({
	host: 'smtp.zoho.com',
	port: 587,
	secure: false,
	auth: {
		user: EMAIL_ACCOUNT,
		pass: EMAIL_PASSWORD
	}
});

mailTransport.use('compile', htmlToText());
// export type MailerType = typeof mailTransport;
export default mailTransport;
