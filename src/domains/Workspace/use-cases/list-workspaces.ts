/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExpressError } from '@common/errors/ExpressError';
import { IWorkspaceRepository } from '../interfaces';
export default function makeListWorkspaceUseCase({
	workspaceDB
}: {
	workspaceDB: IWorkspaceRepository;
}) {
	return async function (
		limit: number | string,
		page: number | string,
		query?: any
	) {
		if (!limit) {
			limit = 20;
		}
		if (!page) {
			page = 1;
		}
		const workspaces = await workspaceDB.find(
			Number(limit),
			Number(page),
			query
		);
		if (workspaces.length < 1) {
			throw new ExpressError({
				message: 'No workspaces',
				data: {},
				status: 'warning',
				statusCode: 400
			});
		}
		return workspaces;
	};
}
