import UserRepository from '../UserRepository';
import makeAddUserUseCase from './add_new_user';
import makeEditActivateUserUseCase from './activate_user';
import makeEditUserPasswordUseCase from './change_user_password';
import makeEditUserUseCase from './edit_user';
import makeListUserByEmail from './list_user_by_email';
import makeListUserByIdUseCase from './list-user-by-id';
import makeListUsersUseCase from './list-users';
import makeRemoveUserUseCase from './remove-user';
import makeRequestAccountActivation from './request_account_activation-link';
import makeRequestPasswordReset from './request_password_reset';

const addUserUseCase = makeAddUserUseCase({ userDB: UserRepository });
const listUserByIdUseCase = makeListUserByIdUseCase({ userDB: UserRepository });
const listUsersUseCase = makeListUsersUseCase({ userDB: UserRepository });
const listUserByEmailUseCase = makeListUserByEmail({ userDB: UserRepository });
const editUserUseCase = makeEditUserUseCase({ userDB: UserRepository });
const removeUserUseCase = makeRemoveUserUseCase({ userDB: UserRepository });
const activateUserUseCase = makeEditActivateUserUseCase({
	userDB: UserRepository
});
const editPasswordUseCase = makeEditUserPasswordUseCase({
	userDB: UserRepository
});
const requestPasswordReset = makeRequestPasswordReset({
	userDB: UserRepository
});
const requestAccountActivation = makeRequestAccountActivation({
	userDB: UserRepository
});

export default Object.freeze({
	addUserUseCase,
	listUserByIdUseCase,
	listUsersUseCase,
	listUserByEmailUseCase,
	editUserUseCase,
	removeUserUseCase,
	activateUserUseCase,
	editPasswordUseCase,
	requestPasswordReset,
	requestAccountActivation
});

export {
	addUserUseCase,
	listUserByIdUseCase,
	listUsersUseCase,
	listUserByEmailUseCase,
	editUserUseCase,
	activateUserUseCase,
	editPasswordUseCase,
	removeUserUseCase,
	requestPasswordReset,
	requestAccountActivation
};

export type TodoUseCasesType =
	| typeof addUserUseCase
	| typeof listUserByIdUseCase
	| typeof listUsersUseCase
	| typeof listUserByEmailUseCase
	| typeof editUserUseCase
	| typeof removeUserUseCase
	| typeof editPasswordUseCase
	| typeof activateUserUseCase
	| typeof requestPasswordReset
	| typeof requestAccountActivation;
