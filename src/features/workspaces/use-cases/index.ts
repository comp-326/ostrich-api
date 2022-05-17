import { ExpressError } from '@ostrich-app-common/errors/ExpressError';
import { IWorkspace } from '@ostrich-app-features/workspaces/models/interfaces';
import createWorkspace from '../entities';
import validateMongodbId from '@ostrich-app-utils/mongo/ObjectId-validator';
import {
	IWorkspaceRepository,
	IWorkspaceUseCases,
} from '@ostrich-app-features/workspaces/interfaces';

export class WorkspaceUseCase implements IWorkspaceUseCases {
	constructor(private readonly repository: IWorkspaceRepository) { }

	addWorkspace = async (workspaceData: IWorkspace) => {
		if (!workspaceData.ownerId) {
			throw new ExpressError({
				message: 'OwnerId is required',
				statusCode: 400,
				status: 'warning',
				data: {},
			});
		}
		if (!validateMongodbId(workspaceData.ownerId)) {
			throw new ExpressError({
				message: 'OwnerId is not valid',
				statusCode: 400,
				status: 'warning',
				data: {},
			});
		}
		if (!workspaceData.name) {
			throw new ExpressError({
				message: 'Name is required',
				statusCode: 400,
				status: 'warning',
				data: {},
			});
		}
		if (!workspaceData.type) workspaceData.type = 'personal';

		const existing = await this.repository.findByName(workspaceData.name);
		if (existing) {
			throw new ExpressError({
				message: 'Workspace with this name already exists',
				statusCode: 400,
				status: 'warning',
				data: {},
			});
		}
		const { getLogo, getName, getOwnerId, getType } = createWorkspace({
			logo: workspaceData.logo,
			name: workspaceData.name,
			ownerId: workspaceData.ownerId,
			type: workspaceData.type,
		});
		const res = await this.repository.createWorkspace({
			logo: getLogo(),
			name: getName(),
			ownerId: getOwnerId(),
			type: getType(),
		});

		return res;
	};

	copyWorkspace = async (workspaceData: IWorkspace) => {
		const res = await this.repository.createWorkspace(workspaceData);

		return res;
	};

	editWorkspace = async (workspaceId: string, workspaceData: IWorkspace) => {
		if (!workspaceId) {
			throw new ExpressError({
				message: 'WorkspaceId is required',
				statusCode: 400,
				status: 'warning',
				data: {},
			});
		}
		if (!validateMongodbId(workspaceId)) {
			throw new ExpressError({
				message: 'WorkspaceId is not valid',
				statusCode: 400,
				status: 'warning',
				data: {},
			});
		}
		const existing = await this.repository.findById(workspaceId);
		if (!existing) {
			throw new ExpressError({
				message: 'Workspace with this id does not exist',
				statusCode: 400,
				status: 'warning',
				data: {},
			});
		}
		const { getLogo, getName, getOwnerId, getType } = createWorkspace({
			...existing._doc, ...workspaceData
		});
		const res = await this.repository.updateById(workspaceId, {
			logo: getLogo(),
			name: getName(),
			ownerId: getOwnerId(),
			type: getType(),
		});

		return res;
	};

	listWorkspaceById = async (id: string) => {
		const res = await this.repository.findWorkspaceById(id);
		if (!res) {
			throw new ExpressError({
				message: 'Workspace not found',
				statusCode: 404,
				status: 'warning',
				data: {},
			});
		}

		return res;
	};

	listWorkspaceByName = async (name: string) => {
		const res = await this.repository.findByName(name);

		return res;
	};

	listWorkspaces = async (limit: number, offset: number) => {
		const res = await this.repository.findAll(limit, offset);

		return res;
	};

	listUserWorkspaces = async (
		userId: string,
		props: { limit: number; offset: number }
	) => {
		const res = await this.repository.findUserWorkspaces(
			userId,
			props.limit,
			props.offset
		);

		return res;
	};

	moveWorkspace = async (workspaceData: IWorkspace) => {
		const res = await this.repository.createWorkspace(workspaceData);

		return res;
	};

	softRemoveWorkspace = async (id: string) => {
		const res = await this.repository.deleteById(id);

		return res;
	};

	hardRemoveWorkspace = async (workspaceData: IWorkspace) => {
		const res = await this.repository.createWorkspace(workspaceData);

		return res;
	};

	
}
