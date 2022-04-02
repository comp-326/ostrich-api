/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import RoleModel from "@base/src/models/Roles/RoleModel"
import UserModel from "@base/src/models/Users/UserModel"
import Password from "../../Users/utils/Password"
import { IUser, IAuthRepository } from "../interfaces"

class TodoRepository implements IAuthRepository {
	createUser = async (user: IUser) => {
		const roles = await RoleModel.find()
		if (roles.length < 1) {
			await RoleModel.InsertRoles()
		}
		const defaultRole = await RoleModel.findOne({ default: true })
		const newUser = await UserModel.create({
			...user,
			role: defaultRole,
		})

		return newUser
	}
	findByEmail = async (title: string) => {
		const todo = await UserModel.findByEmail(title)
		return todo
	}

	login = async (email: string, password: string) => {
		const user = await UserModel.findByEmail(email)
		const passwordMatch = await Password.comparePassword(
			password,
			user.password,
		)
		return { passwordMatch, user }
	}
}

export default new TodoRepository()
