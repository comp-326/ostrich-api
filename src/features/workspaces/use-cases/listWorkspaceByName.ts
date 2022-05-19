import { IWorkspaceRepository } from '../interfaces';

export function makeSoftListWorkspaceByName({ repository }: { repository: IWorkspaceRepository }) {
	return async (name: string) => {
		const res = await repository.findByName(name);

		return res;
	};
}