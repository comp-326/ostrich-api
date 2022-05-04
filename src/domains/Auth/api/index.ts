import { makeQueryLoginApiCall } from '@ostrich-app/domains/Auth/api/login-user';
import { makeQueryLogoutApiCall } from '@ostrich-app/domains/Auth/api/logout';
import { makeQueryRegisterApiCall } from '@ostrich-app/domains/Auth/api/register-user';
import { makeQueryRolesApiCall } from '@ostrich-app/domains/Auth/api/auth-roles';

export default Object.freeze({
	makeQueryLoginApiCall,
	makeQueryRegisterApiCall,
	makeQueryRolesApiCall,
	makeQueryLogoutApiCall
});
