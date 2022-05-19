/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IWorkspace } from '@ostrich-app-features/workspaces/models/interfaces';
import { IWorkspaceMember } from '@ostrich-app/features/workspaceMember/models/interfaces';
import { IWorkspaceRepository } from '@ostrich-app-features/workspaces/interfaces';
import WorkspaceModel from '@ostrich-app-features/workspaces/models';
import mediaModel from '@ostrich-app-features/media/models';
import workspaceMemberModel from '@ostrich-app-features/workspaceMember/models';
import workspaceRoleModel from '@ostrich-app-features/workspaceRoles/models';

class WorkspaceRepository implements IWorkspaceRepository {

	getWorspaceAdminRole = async () => {
		const role = await workspaceRoleModel.findOne({ name: 'admin' });
	};

	createWorkspaceAdminMember = async (workspaceMemberData: IWorkspaceMember) => {
		const adminRole = await workspaceRoleModel.findOne({ name: 'admin' });

		return await workspaceMemberModel.create({ ...workspaceMemberData, });
	};

	findAll = async (limit: number, page: number) => {

		return { limit, page };
	};

	findUserWorkspaces = async (
		userId: string,
		limit: number,
		page: number,
	) => {

		return await WorkspaceModel.find({

		});
	};

	findByName = async (name: string) => {
		const folder = await WorkspaceModel.findOne({ name });

		return folder;
	};

	findById = async (id: string) => {
		const folder = await WorkspaceModel.findById(id);

		return folder;
	};

	findWorkspaceById = async (id: string) => {
		const workspace = await WorkspaceModel.findById(id);

		return workspace;
	};

	find = async (limit: number, page: number) => {
		const folders = await WorkspaceModel.find()
			.limit(limit)
			.skip(limit * (page - 1));

		return folders;
	};

	findWorkspaceWorkspaces = async (
		workspaceId: string,
		limit: number,
		page: number,
	) => {
		const workspaceWorkspaces = await WorkspaceModel.find({
			workspace: workspaceId,
		})
			.limit(limit)
			.skip(limit * (page - 1));

		return workspaceWorkspaces;
	};

	updateById = async (id: string, data: IWorkspace) => {
		const editedWorkspace = await WorkspaceModel.findByIdAndUpdate(
			id,
			{ ...data },
			{ new: true },
		);

		return editedWorkspace;
	};

	deleteById = async (id: string) => {
		await WorkspaceModel.findByIdAndDelete(id);

		return true;
	};

	comment = async (id: string) => {
		return { id };
	};

	like = async (userId: string, id: string) => {
		return {};
	};

	move = async (destinationWorkspace: string, folderId: string) => {
		const movedWorkspace = await WorkspaceModel.findByIdAndUpdate(
			folderId,
			{
				workspace: destinationWorkspace,
			},
		);

		return movedWorkspace;
	};

	copy = async (destinationWorkspace: string, folderData: IWorkspace) => {
		const copiedWorkspace = await WorkspaceModel.create({
			...folderData,
			workspace: destinationWorkspace,
		});

		return copiedWorkspace;
	};

	createWorkspace = async (data: IWorkspace) => {
		const logo = await mediaModel.create({
			type: 'logo',
			mediaType: 'image',
			size: 200,
			uploadId: data.name,
			url: 'https://www.gravatar.com/avatar/f=y?d=identicon&s=200&r=g&f=y',
		});
		const newWorkspace = await WorkspaceModel.create({ ...data, logo });

		return newWorkspace;
	};


	getWorkspace = async (workspaceId: string) => {
		return await WorkspaceModel.findById(workspaceId);
	};

	getWorkspaceAdminRole = async () => {
		if (!(await workspaceRoleModel.getDefaultRole()))
			return;

	};
}

export default new WorkspaceRepository();
