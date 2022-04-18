import UserRepository from "../UserRepository"
import makeAddUserUseCase from "./add-user"
import makeEditUserUseCase from "./edit-user"
import makeListUserByIdUseCase from "./list-user-by-id"
import makeListUserByEmail from "./list-user-by-email"
import makeListUsersUseCase from "./list-users"
import makeRemoveUserUseCase from "./remove-user"

const addUserUseCase = makeAddUserUseCase({ userDB: UserRepository })
const listUserByIdUseCase = makeListUserByIdUseCase({ userDB: UserRepository })
const listUsersUseCase = makeListUsersUseCase({ userDB: UserRepository })
const listUserByEmailUseCase = makeListUserByEmail({ userDB: UserRepository })
const editUserUseCase = makeEditUserUseCase({ userDB: UserRepository })
const removeUserUseCase = makeRemoveUserUseCase({ userDB: UserRepository })

export default Object.freeze({
	addUserUseCase,
	listUserByIdUseCase,
	listUsersUseCase,
	listUserByEmailUseCase,
	editUserUseCase,
	removeUserUseCase,
})

export {
	addUserUseCase,
	listUserByIdUseCase,
	listUsersUseCase,
	listUserByEmailUseCase,
	editUserUseCase,
	removeUserUseCase,
}

export type TodoUseCasesType =
	| typeof addUserUseCase
	| typeof listUserByIdUseCase
	| typeof listUsersUseCase
	| typeof listUserByEmailUseCase
	| typeof editUserUseCase
	| typeof removeUserUseCase
