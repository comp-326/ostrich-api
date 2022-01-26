export function passwordLink({
	CLIENT_RESET_URL,
	token,
}: {
	CLIENT_RESET_URL: string
	token: string
	device: string
}): string {
	return `${CLIENT_RESET_URL}/${token}`
}
