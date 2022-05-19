import { ExpressError } from '@ostrich-app/common/errors/ExpressError';
import { IWorkspace } from '@ostrich-app-features/workspaces/models/interfaces';
import validateMongodbId from '@ostrich-app/utils/mongo/ObjectId-validator';

type WorkspaceType = {
	logo: string,
	name: string,
	owner: string,
	type: IWorkspace['type'],
};

export default function makeCreateWorkspaceEntity() {
	return function createUser({ logo, name, owner, type }: WorkspaceType) {
		if (!owner) {
			throw new ExpressError({
				message: 'OwnerId is required',
				statusCode: 400,
				status: 'warning',
				data: {},
			});
		}
		if (!validateMongodbId(owner)) {
			throw new ExpressError({
				message: 'OwnerId is not valid',
				statusCode: 400,
				status: 'warning',
				data: {},
			});
		}
		if (!name) {
			throw new ExpressError({
				message: 'Name is required',
				statusCode: 400,
				status: 'warning',
				data: {},
			});
		}
		if (!type) type = 'personal';

		return Object.freeze({
			getLogo: () => logo,
			getName: () => name,
			getOwner: () => owner,
			getType: () => type,
		});
	};
}
