import {
	addAvailabilityUseCase,
	editAvailabilityUseCase,
	listUserAvailabilityUseCase,
	listAvailabilityById,
	removeAvailabilityUseCase,
} from '../use-cases';
import makeBuildPostAvailabilityController from './post-availability';
import makeBuildFindUserAvailabilityController from './find-availability';
import makeBuildFindAvailabilityByIdController from './find-by-id';
import makeBuildPutAvailabilityController from './put-availability';
import makeBuildDeleteAvailabilityController from './delete-availability';

const postAvailability = makeBuildPostAvailabilityController({
	create: addAvailabilityUseCase,
});
const findUserAvailability = makeBuildFindUserAvailabilityController({
	find: listUserAvailabilityUseCase,
});
const findById = makeBuildFindAvailabilityByIdController({
	listById: listAvailabilityById,
});
const putById = makeBuildPutAvailabilityController({
	update: editAvailabilityUseCase,
});
const deleteById = makeBuildDeleteAvailabilityController({
	remove: removeAvailabilityUseCase,
});

export default Object.freeze({
	postAvailability,
	findUserAvailability,
	putById,
	deleteById,
	findById,
});

export { postAvailability, findUserAvailability, putById, deleteById, findById };

export type AvailabilityControllerType =
	| typeof postAvailability
	| typeof findUserAvailability
	| typeof putById
	| typeof findById
	| typeof deleteById
