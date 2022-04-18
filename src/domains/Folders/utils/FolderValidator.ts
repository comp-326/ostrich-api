/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {  IFolderValidator } from "../interfaces"

class UserInfoValidator implements IFolderValidator {
	isValidFolder = (name: string) => {
		if (name) {
			return true
		}
		return false
	}
}

export default new UserInfoValidator()
