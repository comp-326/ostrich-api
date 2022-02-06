export default ({
	token,
	CLIENT_URL,
}: {
	device: "web" | "mobile"
	token: string
	CLIENT_URL: string
}) => {
	return `${CLIENT_URL}/#/register/verify/${token}`
}
