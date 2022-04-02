import { makeQueryNewUserApiCall } from "./new-user-api"
import { makeQueryIdUserApiCall } from "./get-user-by-id-api"
import { makeQueryEmailUserApiCall } from "./get-user-by-email-api"
import { makeQueryUserApiCall } from "./get-user-api"
import { makeUpdateUserApiCall } from "./update-user-api"
import { makeDeleteUserApiCall } from "./delete-user-api"

export default Object.freeze({
	makeQueryNewUserApiCall,
	makeQueryIdUserApiCall,
	makeQueryEmailUserApiCall,
	makeQueryUserApiCall,
	makeUpdateUserApiCall,
	makeDeleteUserApiCall,
})
