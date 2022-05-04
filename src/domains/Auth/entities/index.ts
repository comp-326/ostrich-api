import UserInfoValidator from '@ostrich-app/domains/Users/utils/UserInfoValidator';
import Password from '@ostrich-app/domains/Users/utils/Password';
import makeCreateUserEntity from '@ostrich-app/domains/Auth/entities/user';

const createUser = makeCreateUserEntity({
	validator: UserInfoValidator,
	passwordUtil: Password
});

export default createUser;

// export type UserInfoValidator = typeof Validate
