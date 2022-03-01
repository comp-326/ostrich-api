/* eslint-disable @typescript-eslint/no-explicit-any */
import nodeMailer from "nodemailer"
import { htmlToText } from "nodemailer-html-to-text"
import { EMAIL_ACCOUNT, EMAIL_PASSWORD } from "../../config"

export const mailTransport = nodeMailer.createTransport({
	host: "smtp.zoho.com",
	port: 587,
	secure: false,
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
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
	<style>
	body{
		font-size:1rem;
		padding:20px;
	}
	</style>
</head>
<body>
<h3>Reset your password</h3>
<p>Please click the link below to reset your password</p>
<p>The link will expire in the next 24hours</p>
<a href=${link}>Reset password</a>
</body>
</html>
	
	`
}
export const activateAccountTemplate = (link: string) => {
	return `
	<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
	<style>
body{font-size:1rem;}
</style>
</head>
<body>
<h1>Welcome, to ostrich</h1>
<p>Please click the link below to activate your account</p>
<p>The link will expire in the next 24hours</p>
<a href=${link}>Activate your account</a>
</body>
</html>
	
	`
}

export const activationAccountTemplate = (link: string) => {
	return `
	<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
body{font-size:1rem;}
</style>
<body>
<h1>Welcome, to ostrich</h1>
<p>Please click the link below to activate your account</p>
<p>The link will expire in the next 24hours</p>
<a href=${link}>Activate your account</a>
</body>
</html>
	
	`
}
