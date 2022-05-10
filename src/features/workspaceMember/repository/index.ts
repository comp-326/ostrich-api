/* eslint-disable @typescript-eslint/no-explicit-any */
import { IWorkspaceMember } from '../models/interfaces';
import { IWorkspaceMemberRepository } from './../interfaces';
import userModel from '@ostrich-app/features/users/models';
import workspaceMemberModel from '../models';
import workspaceModel from '@ostrich-app/features/workspaces/models';

class WorkspaceMemberRepository implements IWorkspaceMemberRepository {
	getWorkspaceMember=async(workspaceMemberId: string) => {
		return await workspaceMemberModel.findById(workspaceMemberId);
	};

	getWorkspace = async (workspaceId: string) => {
		return await workspaceModel.findById(workspaceId);
	};

	getWorkspaceOwner = async (workspaceOwnerId: string) => {
		return await userModel.findById(workspaceOwnerId);
	};

	createNewWorkspaceMember = async (
		workspaceMemberData: IWorkspaceMember,
	) => {
		return workspaceMemberModel.create(workspaceMemberData);
	};

	findAll = async (workspaceId: string) => {
		return workspaceMemberModel.find({ workspaceId });
	};

	findMembersByRole = async (workspaceId: string, roleId: string) => {
		return await workspaceMemberModel.find({ workspaceId, roleId });
	};

	updateMemberRole = async (
		workspaceId: string,
		memberId: string,
		roleId: string,
	) => {
		return await workspaceMemberModel.findOneAndUpdate(
			{ workspaceId, memberId },
			{ roleId },
		);
	};

	deleteMember = async (workspaceMemberId: string) => {
		return await workspaceMemberModel.findByIdAndDelete(workspaceMemberId);
	};
}

export default new WorkspaceMemberRepository();
