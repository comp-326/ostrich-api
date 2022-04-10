import bcryptjs from "bcryptjs"

class Password {
	/**
	 *
	 * @param {string} password
	 */
	hashPass = async (password: string) => {
		const salt = await bcryptjs.genSalt(10)
		const h_pass = await bcryptjs.hash(password, salt)
		return h_pass
	}
	/**
	 *
	 * @param {string} password
	 * @param {string} passwordHash
	 * @returns
	 */
	comparePassword = async (password: string, passwordHash: string) => {
		const match = await bcryptjs.compare(password, passwordHash)
		return match
	}
	/**
	 *
	 * @param {{props:any,fields:{fieldName:string,name:string}[]}} param0
	 * @returns
	 */
	passwordRegex = function ({
		props,
		fields,
	}: {
		props: { [x: string]: string },
		fields: { fieldName: string, name: string }[],
	}): { passOK: boolean, errors: string } {
		let errors = ""
		try {
			for (let key of Object.keys(props)) {
				if (fields.some((f) => f.fieldName === key)) {
					const regex = new RegExp(props[key], "i")
					const field = fields.find((f) => f.fieldName === key)
					if (regex.test(props!["password"])) {
						errors += `Password should not contain your ${field!.name}\n`
					}
				}
			}
			if (!/[a-z]/.test(props["password"])) {
				errors += "Password must contain at least 1 lowercase letter\n"
			}
			if (!/[A-Z]/.test(props["password"])) {
				errors += "Password must contain at least 1 uppercase letter\n"
			}
			if (!/[0-9]/.test(props["password"])) {
				errors += "Password must contain at least a number\n"
			}
			if (!/[\w]{7,16}/.test(props["password"])) {
				errors += "Password must be at least 8 characters long\n"
			}
			if (/[.*+?^${}#%^@!`()|[\]\\]{4,}/.test(props["password"])) {
				errors +=
					"Password must not contain more than 4 repeating characters\n"
			}
			if (!/[.*+?^${}#%^@!`()|[\]\\]/.test(props["password"])) {
				errors +=
					"Password must be at least 1 special character (.*+?^${}#%^@!`())\n"
			}
			if (errors !== "") {
				return { passOK: false, errors }
			}
			return { passOK: true, errors }
		} catch (err) {
			return { passOK: false, errors }
		}
	}
}

export default new Password()
