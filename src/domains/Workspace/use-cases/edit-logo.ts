/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRequest } from '@common/types';
import { ExpressError } from '@common/errors/ExpressError';
import createWorkspace from '../entities';
import { IWorkspaceRepository } from '../interfaces';
export default function makeEditLogoUseCase({
	workspaceDB
}: {
	workspaceDB: IWorkspaceRepository;
}) {
	return async function uploadLogo(fileRequest: IRequest) {
		const file = fileRequest.file;
		const { id } = fileRequest.params;
		const existing = await workspaceDB.findById(id);
		if (!existing) {
			throw new ExpressError({
				message: 'Workspace does not exist',
				data: {},
				status: 'warning',
				statusCode: 404
			});
		}
		const workspace = createWorkspace({
			...existing,
			logo: { public_id: '', url: file?.filename }
		});
		const updated = await workspaceDB.updateById(id, {
			name: workspace.getName(),
			owner: workspace.getOwner(),
			logo: workspace.getLogo(),
			type: workspace.getType()
		});
		return updated;
	};
}
