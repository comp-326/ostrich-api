export const ActivateEmailTemplate = (
	to: string,
	subject: string,
	token: string,
) => {
	return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>${subject}</h1>
    <p>
        Please click the link below to activate your account email ${to}
    </p>
    <p>
    <a href="http://localhost:3000/auth/account/confirm/${token}">Activate account</a>
    </p>
</body>
</html>
    `
}
