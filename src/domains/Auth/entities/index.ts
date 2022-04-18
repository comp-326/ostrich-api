import UserInfoValidator from '@root/domains/Users/utils/UserInfoValidator';
import Password from '../../Users/utils/Password';
import makeCreateUserEntity from './user';

const createUser = makeCreateUserEntity({
	validator: UserInfoValidator,
	passwordUtil: Password
});

export default createUser;

// export type UserInfoValidator = typeof Validate
