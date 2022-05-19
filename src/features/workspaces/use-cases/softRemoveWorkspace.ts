import { IWorkspaceRepository } from '../interfaces';

export function makeSoftRemoveWorkspace({repository}:{repository:IWorkspaceRepository}){
	return async (id: string) => {
		const res = await repository.deleteById(id);

		return res;
	};
}