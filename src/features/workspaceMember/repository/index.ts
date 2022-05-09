/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUser } from '@ostrich-app/features/users/models/interfaces';
import { IWorkspaceMemberRepository } from './../interfaces';

class UserRoleRepository implements IWorkspaceMemberRepository {
	findAll: (workspaceId: string) => Promise<any>;

	findMembersByRole: (workspaceId: string, roleId: string) => Promise<any>;

	createNewMember: (workspaceId: string, roleId: string, memberData: IUser) => Promise<any>;

	updateMemberRole: (workspaceId: string, memberId: string) => Promise<any>;

	deleteMember: (workspaceId: string, memberId: string) => Promise<any>;
}

export default new UserRoleRepository();
