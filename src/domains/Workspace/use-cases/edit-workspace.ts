/* eslint-disable @typescript-eslint/no-explicit-any */
import { IWorkspaceEntity, IWorkspaceRepository } from '@ostrich-domains/Workspace/interfaces';
import { ExpressError } from '@ostrich-common/errors/ExpressError';
import createWorkspace from '@ostrich-domains/Workspace/entities';
import validateMongodbId from '@ostrich-utils/mongo/ObjectId-validator';

export default function makeEditWorkspaceUseCase({
	workspaceDB
}: {
	workspaceDB: IWorkspaceRepository;
}) {
	return async function (id: string, data: IWorkspaceEntity) {
		if (!id) {
			throw new ExpressError({
				message: 'Please provide workspace id',
				statusCode: 400,
				data: {},
				status: 'warning'
			});
		}
		if (!validateMongodbId(id)) {
			throw new ExpressError({
				message: 'Please provide a valid workspace id',
				data: {},
				status: 'warning',
				statusCode: 400
			});
		}
		const existing = await workspaceDB.findById(id);
		if (!existing) {
			throw new ExpressError({
				message: 'Message does not exist',
				data: {},
				status: 'warning',
				statusCode: 400
			});
		}
		const workspace = createWorkspace({ ...existing, ...data });
		const edited = await workspaceDB.updateById(id, {
			name: workspace.getName(),
			type: workspace.getType(),
			owner: workspace.getOwner(),
			logo: workspace.getLogo()
		});
		return edited;
	};
}
