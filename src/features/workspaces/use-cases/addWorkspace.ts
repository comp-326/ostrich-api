import { ExpressError } from '@ostrich-app/common/errors/ExpressError';
import { IWorkspace } from '../models/interfaces';
import { IWorkspaceRepository } from '@ostrich-app-features/workspaces/interfaces';
import createWorkspace from '../entities';
import validateMongodbId from '@ostrich-app/utils/mongo/ObjectId-validator';
import { workspaceMemberFactory } from '@ostrich-app/factories/workspaceMember';

export function makeAddWorkspace({
	repository,
}: {
	repository: IWorkspaceRepository,
}) {
	return async (workspaceData: IWorkspace) => {
		if (!workspaceData.ownerId) {
			throw new ExpressError({
				message: 'OwnerId is required',
				statusCode: 400,
				status: 'warning',
				data: {},
			});
		}
		if (!validateMongodbId(workspaceData.ownerId)) {
			throw new ExpressError({
				message: 'OwnerId is not valid',
				statusCode: 400,
				status: 'warning',
				data: {},
			});
		}
		if (!workspaceData.name) {
			throw new ExpressError({
				message: 'Name is required',
				statusCode: 400,
				status: 'warning',
				data: {},
			});
		}
		if (!workspaceData.type) workspaceData.type = 'personal';

		const existing = await repository.findByName(workspaceData.name);
		if (existing) {
			throw new ExpressError({
				message: 'Workspace with this name already exists',
				statusCode: 400,
				status: 'warning',
				data: {},
			});
		}
		const { getLogo, getName, getOwnerId, getType } = createWorkspace({
			logo: workspaceData.logo,
			name: workspaceData.name,
			ownerId: workspaceData.ownerId,
			type: workspaceData.type,
		});
		const res = await repository.createWorkspace({
			logo: getLogo(),
			name: getName(),
			ownerId: getOwnerId(),
			type: getType(),
		});
		const role = await repository.getWorkspaceAdminRole();
		const workspaceMember = await workspaceMemberFactory()(
			role._id,
			workspaceData.ownerId,
			res._id,
		);
		await repository.createWorkspaceAdminMember(workspaceMember);

		return res;
	};
}
