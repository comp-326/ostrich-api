import { IWorkspaceRepository } from '../interfaces';

export function makeListWorkspaces({repository}:{repository:IWorkspaceRepository}){
	return  async (limit: number, offset: number) => {
		const res = await repository.findAll(limit, offset);

		return res;
	};
}