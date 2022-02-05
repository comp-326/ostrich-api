export function passwordLink({
	CLIENT_RESET_URL,
	token,
	device,
}: {
	CLIENT_RESET_URL: string
	token: string
	device: string
}): string {
	if (device === "web") {
		return `${CLIENT_RESET_URL}/account/password/reset${token}`
	} else {
		return `${CLIENT_RESET_URL}/account/password/reset${token}`
	}
}
