import { makeQueryLoginApiCall } from '@ostrich-domains/Auth/api/login-user';
import { makeQueryLogoutApiCall } from '@ostrich-domains/Auth/api/logout';
import { makeQueryRegisterApiCall } from '@ostrich-domains/Auth/api/register-user';
import { makeQueryRolesApiCall } from '@ostrich-domains/Auth/api/auth-roles';

export default Object.freeze({
	makeQueryLoginApiCall,
	makeQueryRegisterApiCall,
	makeQueryRolesApiCall,
	makeQueryLogoutApiCall
});
