import AvailabilityRepository from "../AvailabilityRepository"
import makeAddAvailabilityUseCase from "./add-availability"
import makeEditAvailabilityUseCase from "./edit-availability"
import makeListUserAvailabilityUseCase from "./list-user-availability"
import makeListAvailabilityByIdUseCase from "./list-availability-by-id"
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
const listAvailabilityById = makeListAvailabilityByIdUseCase({
	avaialbilityDB: AvailabilityRepository,
})

export default Object.freeze({
	addAvailabilityUseCase,
	listUserAvailabilityUseCase,
	editAvailabilityUseCase,
	removeAvailabilityUseCase,
	listAvailabilityById
})

export {
	addAvailabilityUseCase,
	listUserAvailabilityUseCase,
	editAvailabilityUseCase,
	removeAvailabilityUseCase,
	listAvailabilityById
}

export type AvailabilityUseCasesType =
	| typeof addAvailabilityUseCase
	| typeof listUserAvailabilityUseCase
	| typeof editAvailabilityUseCase
	| typeof removeAvailabilityUseCase
	| typeof listAvailabilityById
