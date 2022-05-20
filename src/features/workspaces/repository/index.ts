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
	getWorkspaceAdminRole = async () => {
		const role = await workspaceRoleModel.findOne({ name: 'admin' });

		return role!._id.toString();
	};

	createWorkspaceAdminMember = async (
		workspaceMemberData: IWorkspaceMember,
	) => {
		return await workspaceMemberModel.create(workspaceMemberData);
	};

	findAll = async (limit: number, page: number) => {
		return await WorkspaceModel.find({})
			.populate('logo', '-_id -type -size')
			.limit(limit)
			.skip(limit * (page - 1));
	};

	findUserWorkspaces = async (
		userId: string,
		limit: number,
		page: number,
	) => {
		return await workspaceMemberModel.find({
			member: userId,
		}).populate('workspaceId', '-createdAt -updatedAt -__v')
			.populate('memberRole', '-_id -createdAt -updatedAt -__v')
			.select('-_id -createdAt -updatedAt -__v')
			.limit(limit)
			.skip((page - 1) * limit);
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

	createWorkspace = async (data: IWorkspace) => {
		const logo = await mediaModel.create({
			type: 'logo',
			mediaType: 'image',
			size: 200,
			uploadId: data.name,
			url: 'https://www.gravatar.com/avatar/f=y?d=identicon&s=200&r=g&f=y',
		});
		const newWorkspace = await (await WorkspaceModel.create({ ...data, logo }))
			.populate('owner', '-_id email') as any;
		const id = newWorkspace._id.toString();

		return { ...newWorkspace._doc, id };
	};

	getWorkspace = async (workspaceId: string) => {
		return await WorkspaceModel.findById(workspaceId);
	};
}

export default new WorkspaceRepository();
