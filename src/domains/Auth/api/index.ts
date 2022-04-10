import { makeQueryLoginApiCall } from "./login-user"
import { makeQueryRegisterApiCall } from "./register-user"
import {makeQueryRolesApiCall} from "./auth-roles"

export default Object.freeze({
	makeQueryLoginApiCall,
	makeQueryRegisterApiCall,
	makeQueryRolesApiCall
})
