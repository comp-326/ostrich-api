/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExpressError } from '@common/errors/ExpressError';
import { IWorkspaceRepository } from '../interfaces';
export default function makeListUserWorkspaceUseCase({
	workspaceDB
}: {
	workspaceDB: IWorkspaceRepository;
}) {
	return async function (id: string) {
		if (!id) {
			throw new ExpressError({
				message: 'Please provide user id',
				data: {},
				status: 'warning',
				statusCode: 400
			});
		}
		const workspaces = await workspaceDB.findUserWorkspaces(id);
		if (workspaces.length < 1) {
			throw new ExpressError({
				message: 'No user workspaces found',
				data: {},
				status: 'warning',
				statusCode: 400
			});
		}
		return workspaces;
	};
}
