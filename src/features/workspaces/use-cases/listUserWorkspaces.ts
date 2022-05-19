import { IWorkspaceRepository } from '../interfaces';

type Params = {
    userId: string,
    props: { limit: number; offset: number }
}

export function makeListUserWorkspaces({ repository }: { repository: IWorkspaceRepository }) {
	return async (params: Params) => {
		const { props: { limit, offset }, userId } = params;
		const res = await repository.findUserWorkspaces(
			userId,
			limit,
			offset
		);

		return res;
	};
}