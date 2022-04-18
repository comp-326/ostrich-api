import { IWorkspaceEntity } from '../interfaces';
import { ExpressError } from '@base/src/common/errors/ExpressError';

export default function makeCreateWorkspaceEntity() {
	return function createWorkspace({
		name,
		owner,
		type,
		logo
	}: IWorkspaceEntity) {
		if (!name) {
			throw new ExpressError({
				message: 'Workspace name required',
				statusCode: 400,
				data: {},
				status: 'warning'
			});
		}
		if (!type) {
			throw new ExpressError({
				message: 'Workspace type required',
				statusCode: 400,
				data: {},
				status: 'warning'
			});
		}
		if (!owner) {
			throw new ExpressError({
				message: 'Workspace owner required',
				statusCode: 400,
				data: {},
				status: 'warning'
			});
		}

		return {
			getName: () => name,
			getType: () => type,
			getOwner: () => owner,
			getLogo: () => logo
		};
	};
}
