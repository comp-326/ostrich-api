import {
	addUserUseCase,
	editUserUseCase,
	listUserByIdUseCase,
	listUserByEmailUseCase,
	listUsersUseCase,
	removeUserUseCase,
} from "../use-cases"
import makeBuildDeleteUserController from "./delete-user"
import makeBuildFindByIdUserController from "./find-by-id"
import makeBuildFindByTitleUserController from "./find-by-email"
import makeBuildFindUsersController from "./find-users"
import makeBuildPostUserController from "./post-user"
import makeBuildUpdateByIdUserController from "./put-user"

const postUser = makeBuildPostUserController({ create: addUserUseCase })
const putUser = makeBuildUpdateByIdUserController({ update: editUserUseCase })
const deleteUser = makeBuildDeleteUserController({ remove: removeUserUseCase })
const findById = makeBuildFindByIdUserController({ listById: listUserByIdUseCase })
const findByTitle = makeBuildFindByTitleUserController({ listByEmail: listUserByEmailUseCase })
const findUsers = makeBuildFindUsersController({ find: listUsersUseCase })

export default Object.freeze({
	postUser,
	putUser,
	deleteUser,
	findById,
	findByTitle,
	findUsers
})

export { postUser, putUser, deleteUser, findById, findByTitle,findUsers }

export type UserControllerType =
	| typeof postUser
	| typeof putUser
	| typeof deleteUser
	| typeof findById
	| typeof findByTitle
	| typeof findUsers
