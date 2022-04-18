import { makeQueryNewAvailabilityApiCall } from "./new-availability-api"
import { makeQueryAvailabilityIdApiCall } from "./get-availability-by-id-api"
import { makeQueryUserVailabilityApiCall } from "./get-user-avilability-api"
import { makeUpdateAvailabilityApiCall } from "./update-availability-api"
import { makeDeleteAvailabilityApiCall } from "./delete-availability-api"

export default Object.freeze({
	makeQueryNewAvailabilityApiCall,
	makeQueryAvailabilityIdApiCall,
	makeQueryUserVailabilityApiCall,
	makeUpdateAvailabilityApiCall,
	makeDeleteAvailabilityApiCall,
})
