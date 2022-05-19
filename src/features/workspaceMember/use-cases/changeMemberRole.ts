import { IWorkspaceMemberRepository } from '../interfaces';

export function makeChangeMemberRole({
	repository,
}: {
	repository: IWorkspaceMemberRepository,
}) {
	return async (params: {
		workspaceId: string,
		memberId: string,
		roleId: string,
	}) => {
		const { workspaceId, memberId, roleId } = params;
		const res = await repository.updateMemberRole(
			workspaceId,
			memberId,
			roleId,
		);

		return res;
	};
}
