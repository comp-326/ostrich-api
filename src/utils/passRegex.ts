/* eslint-disable @typescript-eslint/no-non-null-assertion */
//Validate passwordRegex
export default function ({
	password="",
	firstName="",
	lastName="",
}: {
	password: string
	firstName?: string
	lastName?: string
	email?: string
}): { passOK: boolean; errors: string } {
	let errors = ""
	if (password.search(new RegExp(/[a-z]+/)) < 0) {
		errors += "Password must contain a Lowercase letter\n"
	}
	if (password.search(new RegExp(/[A-Z]+/)) < 0) {
		errors += "Password must contain a Uppercase letter\n"
	}
	if (password.search(new RegExp(/[0-9]+/)) < 0) {
		errors += "Password must contain a number\n"
	}
	if (
		firstName !== "" &&
		typeof firstName !== "undefined" &&
		password.match(new RegExp(firstName!, "i"))
	) {
		errors += "Password must not contain your first name\n"
	}
	if (
		lastName !== "" &&
		typeof lastName !== "undefined" &&
		password.match(new RegExp(lastName!, "i"))
	) {
		errors += "Password must not contain your last name\n"
	}
	if (password.length < 8) {
		errors += "Password must be at least 8 characters\n	"
	}
	// if(!password.match(emailRegex)){
	// 	errors += 'Invalid email address\n'
	// }
	// console.log(firstName, lastName)

	if (errors !== "") {
		return { passOK: false, errors }
	}
	return { passOK: true, errors }
}
