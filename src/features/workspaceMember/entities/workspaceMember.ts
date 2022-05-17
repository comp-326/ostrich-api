import { ExpressError } from '@ostrich-app/common/errors/ExpressError';
import { IWorkspaceMember } from '../models/interfaces';

export default function makeCreateNewWorkspaceMember() {
	return (data: IWorkspaceMember) => {
		if (!data.memberEmail) {
			throw new ExpressError({
				message: 'Member email is required',
				status: 'warning',
				data: {},
				statusCode: 400,
			});
		}
		if (!data.workspaceId) {
			throw new ExpressError({
				message: 'Workspace id is required',
				status: 'warning',
				data: {},
				statusCode: 400,
			});
		}
		if (!data.memberRole) {
			throw new ExpressError({
				message: 'Role id is required',
				status: 'warning',
				data: {},
				statusCode: 400,
			});
		}
		if (!data.member) {
			throw new ExpressError({
				message: 'Member id is required',
				data: {},
				status: 'warning',
				statusCode: 400,
			});
		}

		return Object.freeze({
			getMember: () => data.member,
			getMemberEmail: () => data.memberEmail,
			getMemberRole: () => data.memberRole,
			getWorkspaceId: () => data.workspaceId,
		});
	};
}
