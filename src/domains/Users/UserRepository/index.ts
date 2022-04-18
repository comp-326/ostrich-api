/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import UserModel from "@base/src/models/Users/UserModel"
import { IUser, IUserRepository } from "../interfaces"

class UserRepository implements IUserRepository {
	createUser: (data: IUser) => Promise<any> = async (user: IUser) => {
		// const {pass}=
		const newUser = await UserModel.create(user)
		return newUser
	}
	findByEmail: (email: string) => Promise<any> = async (email: string) => {
		const todo = await UserModel.findByEmail(email)
		return todo
	}
	findById = async (id: string) => {
		const todo = await UserModel.findById(id)
		return todo
	}
	find = async (limit: number, page: number) => {
		const todos = await UserModel.find({ })
			.populate("role", "name -_id ")
			.limit(limit)
			.skip(limit * (page - 1))
		return todos
	}
	updateById = async (id: string, data: IUser) => {
		const updated = await UserModel.findByIdAndUpdate(
			id,
			{ ...data },
			{ new: true },
		)
		return updated!._doc
	}
	deleteById = async (id: string) => {
		const deleted = await UserModel.findByIdAndDelete(id)
		return deleted!._doc
	}
}

export default new UserRepository()
