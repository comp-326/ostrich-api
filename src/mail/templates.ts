/**
 *
 * @param {{firstName:string,lastName:string,link:string}} param0
 * @returns
 */
export const EmailActivationTemp = function ({
	firstName, lastName, link,
}: {
	firstName: string
	lastName: string
	link: string
}): string {
	return `
<html>
<head>
<title>Account activation</title>
</head>
<style>
body{
    background-color:green;
    max-width:60ch;
}
</style>
<body>
<h2>Hello ${firstName} ${lastName} and welcome to Ostrich</h2>
<p>
Please contact the workspace owner to give you the login link
<br/>
Use the details above to login to your account
<br/>
Please click the link below to activate your account
<br/>
The link will expire after 24hrs
<br/>
<a href="${link}">Activate</a>
</p>
</body>
</html>
`
}
export const PasswordResetTemp = () => `
<html>
<head>
<title>Password reset</title>
</head>
</html>
`
export const WorkspaceInviteTemp = () => `
<html>
<head>
<title>Email Invite to workspace</title>
</head>
</html>
`
/**
 *
 * @param {{link:string,firstName:string,lastName:string}} param0
 * @returns
 */
export const ForgotPasswordTemp = ({ link, firstName, lastName }: { link: string; firstName: string; lastName: string} ): string => `
<html>
<head>
<title>Email reset password</title>
</head>
<body>
<h3>Hello ${firstName} ${lastName} </h3>
<p>
Use the link below to reset your password
<br/>
<a href="${link}">Reset password</a>
<p>

</p>
</p>
</body>
</html>
`

/**
 *
 * @param {{password:string, firstName:string, lastName:string, email:string}} param0
 * @returns
 */
export const WorkspaceTeamMemberTemp = function ({
	password, firstName, lastName, email,
}: { password: string; firstName: string; lastName: string; email: string} ): string {
	return `
<html>
<head>
<title>Welcome to Ostrich application</title>
</head>
<body>
<h3>Hello ${firstName} ${lastName} and welcome to Ostrich</h3>
<p>
Account has been created for you with the following details
<br/>
Email: ${email}
<br/>
First name: ${firstName}
<br/>
Last name: ${lastName}
<br/>
Password: ${password}
<br/>
<p>
Please contact the workspace owner to give you the login link
Use the details above to login to your account
</p>
</p>
</body>
</html>
`
}
export default Object.freeze({
	WorkspaceTeamMemberTemp,
	PasswordResetTemp,
	EmailActivationTemp,
	WorkspaceInviteTemp,
	ForgotPasswordTemp,
})
