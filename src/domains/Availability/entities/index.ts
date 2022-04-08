import AvailabilityValidator from "../utils/UserInfoValidator"
import makeCreateAvailabilityEntity from "./availability"

const createUser = makeCreateAvailabilityEntity({
	validator: AvailabilityValidator,
})

export default createUser
