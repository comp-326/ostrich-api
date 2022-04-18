import {
	addUserUseCase,
	editUserUseCase,
	listUserByIdUseCase,
	listUserByEmailUseCase,
	listUsersUseCase,
	removeUserUseCase,
	activateUserUseCase,
	editPasswordUseCase,
	requestPasswordReset,
	requestAccountActivation
} from '../use-cases';

// Get
import makeBuildFindByIdUserController from './find-by-id';
import makeBuildFindByEmailUserController from './find-by-email';
import makeBuildFindUsersController from './find-users';
// Post
import makeBuildPostUserController from './post-user';
import makeBuildPostRequestPasswordResetController from './post_password_reset';
import makeBuildPostRequestAccountActivationController from './post_account_activation_request';
// Update
import makeBuildActivateUserController from './put-activate-user';
import makeBuildUpdateByIdUserController from './put-user';
import makeBuildPutUserPasswordController from './put-user-password';
// Delete
import makeBuildDeleteUserController from './delete-user';

const postUser = makeBuildPostUserController({ create: addUserUseCase });
const putUser = makeBuildUpdateByIdUserController({ update: editUserUseCase });
const deleteUser = makeBuildDeleteUserController({ remove: removeUserUseCase });
const postRequestActivation = makeBuildPostRequestAccountActivationController({
	requestActivation: requestAccountActivation
});
const postRequestPasswordReset = makeBuildPostRequestPasswordResetController({
	requestPassword: requestPasswordReset
});
const findById = makeBuildFindByIdUserController({
	listById: listUserByIdUseCase
});
const findByEmail = makeBuildFindByEmailUserController({
	listByEmail: listUserByEmailUseCase
});
const findUsers = makeBuildFindUsersController({ find: listUsersUseCase });
const activateAccount = makeBuildActivateUserController({
	update: activateUserUseCase
});
const updatePasword = makeBuildPutUserPasswordController({
	update: editPasswordUseCase
});

export default Object.freeze({
	postUser,
	putUser,
	deleteUser,
	findById,
	findByEmail,
	findUsers,
	activateAccount,
	updatePasword,
	postRequestPasswordReset,
	postRequestActivation
});

export {
	postUser,
	putUser,
	deleteUser,
	findById,
	findByEmail,
	findUsers,
	activateAccount,
	updatePasword,
	postRequestPasswordReset,
	postRequestActivation
};

export type UserControllerType =
	| typeof postUser
	| typeof putUser
	| typeof deleteUser
	| typeof findById
	| typeof findByEmail
	| typeof findUsers
	| typeof activateAccount
	| typeof postRequestPasswordReset
	| typeof postRequestActivation;
