import UserInfoValidator from '@ostrich-domains/Users/utils/UserInfoValidator';
import Password from '@ostrich-domains/Users/utils/Password';
import makeCreateUserEntity from '@ostrich-domains/Auth/entities/user';

const createUser = makeCreateUserEntity({
	validator: UserInfoValidator,
	passwordUtil: Password
});

export default createUser;

// export type UserInfoValidator = typeof Validate
