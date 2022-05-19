import { ExpressError } from '@ostrich-app/common/errors/ExpressError';
import { IWorkspace } from '../models/interfaces';
import { IWorkspaceRepository } from '../interfaces';
import createWorkspace from '../entities';
import validateMongodbId from '@ostrich-app/utils/mongo/ObjectId-validator';

export function makeEditWorkspace({ repository }: { repository: IWorkspaceRepository }) {
	return async (workspaceId: string, workspaceData: IWorkspace) => {
		if (!workspaceId) {
			throw new ExpressError({
				message: 'WorkspaceId is required',
				statusCode: 400,
				status: 'warning',
				data: {},
			});
		}
		if (!validateMongodbId(workspaceId)) {
			throw new ExpressError({
				message: 'WorkspaceId is not valid',
				statusCode: 400,
				status: 'warning',
				data: {},
			});
		}
		const existing = await repository.findById(workspaceId);
		if (!existing) {
			throw new ExpressError({
				message: 'Workspace with this id does not exist',
				statusCode: 400,
				status: 'warning',
				data: {},
			});
		}
		const { getLogo, getName, getOwnerId, getType } = createWorkspace({
			...existing._doc, ...workspaceData
		});
		const res = await repository.updateById(workspaceId, {
			logo: getLogo(),
			name: getName(),
			ownerId: getOwnerId(),
			type: getType(),
		});

		return res;
	};

}