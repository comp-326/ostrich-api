import Password from '../utils/password';
import UserInfoValidator from '../utils/userInfoValidator';
import makeCreateUserEntity from './user';

const createUser = makeCreateUserEntity({
	validator: UserInfoValidator,
	passwordUtil: Password
});

export default createUser;

// export type UserInfoValidator = typeof Validate
