import Password from '../utils/Password';
import UserInfoValidator from '../utils/UserInfoValidator';
import makeCreateUserEntity from './user';

const createUser = makeCreateUserEntity({
	validator: UserInfoValidator,
	passwordUtil: Password
});

export default createUser;

// export type UserInfoValidator = typeof Validate
