import { makeQueryLoginApiCall } from './login-user';
import { makeQueryLogoutApiCall } from './logout';
import { makeQueryRegisterApiCall } from './register-user';
import { makeQueryRolesApiCall } from './auth-roles';

export default Object.freeze({
	makeQueryLoginApiCall,
	makeQueryRegisterApiCall,
	makeQueryRolesApiCall,
	makeQueryLogoutApiCall
});
