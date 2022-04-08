import AvailabilityRepository from "../AvailabilityRepository"
import makeAddAvailabilityUseCase from "./add-availability"
import makeEditAvailabilityUseCase from "./edit-availability"
import makeListUserAvailabilityUseCase from "./list-user-availability"
import makeRemoveAvailabilityUseCase from "./remove-availability"

const addAvailabilityUseCase = makeAddAvailabilityUseCase({
	availabilityDB: AvailabilityRepository,
})
const listUserAvailabilityUseCase = makeListUserAvailabilityUseCase({
	avaialbilityDB: AvailabilityRepository,
})
const editAvailabilityUseCase = makeEditAvailabilityUseCase({
	availabilityDB: AvailabilityRepository,
})
const removeAvailabilityUseCase = makeRemoveAvailabilityUseCase({
	availabilityDB: AvailabilityRepository,
})

export default Object.freeze({
	addAvailabilityUseCase,
	listUserAvailabilityUseCase,
	editAvailabilityUseCase,
	removeAvailabilityUseCase,
})

export {
	addAvailabilityUseCase,
	listUserAvailabilityUseCase,
	editAvailabilityUseCase,
	removeAvailabilityUseCase,
}

export type AvailabilityUseCasesType =
	| typeof addAvailabilityUseCase
	| typeof listUserAvailabilityUseCase
	| typeof editAvailabilityUseCase
	| typeof removeAvailabilityUseCase
