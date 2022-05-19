import { ExpressError } from '@ostrich-app/common/errors/ExpressError';
import { IWorkspaceRepository } from '../interfaces';

export function makeSoftListWorkspaceById({repository}:{repository:IWorkspaceRepository}){
	return  async (id: string) => {
		const res = await repository.findWorkspaceById(id);
		if (!res) {
			throw new ExpressError({
				message: 'Workspace not found',
				statusCode: 404,
				status: 'warning',
				data: {},
			});
		}
	};}
