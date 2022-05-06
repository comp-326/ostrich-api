import { IFolder, IFolderValidator } from '@ostrich-app/features/Folders/interfaces';
import { ExpressError } from '@ostrich-app/common/errors/ExpressError';

export default function makeCreateFOlderEntity({
	validator
}: {
	validator: IFolderValidator;
}){
	return function createFolder({
		address,
		comments,
		finance,
		images,
		isStandout,
		likes,
		name,
		prompts,
		size,
		type,
		views
	}: IFolder){
		const { isValidFolder } = validator;
		if (!isValidFolder(name)) {
			throw new ExpressError({
				message: 'Please provide a valid folder name',
				statusCode: 400,
				status: 'warning',
				data: {}
			});
		}

		return Object.freeze({
			getName: () => name,
			getComments: () => comments,
			getAddress: () => address,
			getFinances: () => finance,
			getIsStandout: () => isStandout,
			getImages: () => images,
			getLikes: () => likes,
			getPrompts: () => prompts,
			getSize: () => size,
			getType: () => type,
			getViews: () => views
		});
	};
}