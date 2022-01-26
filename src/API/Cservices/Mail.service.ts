/* eslint-disable @typescript-eslint/no-explicit-any */
import nodeMailer from "nodemailer"
import { htmlToText } from "nodemailer-html-to-text"
import { EMAIL_ACCOUNT, EMAIL_PASSWORD } from "../../config"

export const mailTransport = nodeMailer.createTransport({
	service: "gmail",
	host: "smtp.gmail.com",
	// eslint-disable-next-line indent
    secure:false,
	auth: {
		user: EMAIL_ACCOUNT,
		pass: EMAIL_PASSWORD,
	},
})
mailTransport.use("compile", htmlToText())

export const resetPasswordTemplate = (link: string) => {
	return `
	<!DOCTYPE html>
<html lang="en">
<style>
        a{
            padding: 10px;
            text-decoration: none;
            padding: 10px;
        }
    </style>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<p>Please click the link below to reset your password</p>
<p>The link will expire in the next 24hours</p>
<a href=${link}>Reset password</a>
</body>
</html>
	
	`
}
