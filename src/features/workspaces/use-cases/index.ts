import { ExpressError } from '@ostrich-app-common/errors/ExpressError';
import {  IWorkspace} from '@ostrich-app-features/workspaces/models/interfaces';
import validateMongodbId from '@ostrich-app-utils/mongo/ObjectId-validator';
import {  IWorkspaceRepository, IWorkspaceUseCases } from '@ostrich-app-features/workspaces/interfaces';

export class WorkspaceUseCase implements IWorkspaceUseCases {
	constructor(private readonly repository: IWorkspaceRepository) { }

	addWorkspace=async (workspaceData: IWorkspace) => {
		if(!workspaceData.ownerId){
			throw new ExpressError({
				message: 'OwnerId is required',
				statusCode: 400,
				status:'warning',
				data:{}
			});
		}
		if(!validateMongodbId(workspaceData.ownerId)){
			throw new ExpressError({
				message: 'OwnerId is not valid',
				statusCode: 400,
				status:'warning',
				data:{}
			});
		}
		if(!workspaceData.name){
			throw new ExpressError({
				message: 'Name is required',
				statusCode: 400,
				status:'warning',
				data:{}
			});
		}
		if(!workspaceData.type)
			workspaceData.type='personal';
		

		const res = await this.repository.createWorkspace(workspaceData);

		return res;
	};

	copyWorkspace=async (folderData: IWorkspace) => {
		const res = await this.repository.createWorkspace(folderData);

		return res;
	};

	editWorkspace=async (workspaceId:string,folderData: IWorkspace) => {
		if(!workspaceId){
			throw new ExpressError({
				message: 'WorkspaceId is required',
				statusCode: 400,
				status:'warning',
				data:{}
			});
		}
		if(!validateMongodbId(workspaceId)){
			throw new ExpressError({
				message: 'WorkspaceId is not valid',
				statusCode: 400,
				status:'warning',
				data:{}
			});
		}
		const res = await this.repository.updateById(workspaceId,folderData);

		return res;
	};

	listWorkspaceById=async (id:string) => {
		const res = await this.repository.findWorkspaceById(id);
		if(!res){
			throw new ExpressError({
				message: 'Workspace not found',
				statusCode: 404,
				status:'warning',
				data:{}
			});

		}

		return res;
	};

	listWorkspaceByName=async (name: string) => {
		const res = await this.repository.findByName(name);

		return res;
	};

	listWorkspaces=async (limit:number,offset:number) => {
		const res = await this.repository.findAll(limit,offset);

		return res;
	};

	listUserWorkspaces=async (userId:string,props:{limit:number,offset:number}) => {
		const res = await this.repository.findUserWorkspaces(userId,props.limit,props.offset);

		return res;
	};

	moveWorkspace=async (folderData: IWorkspace) => {
		const res = await this.repository.createWorkspace(folderData);

		return res;
	};

	softRemoveWorkspace=async (id: string) => {
		const res = await this.repository.deleteById(id);

		return res;
	};

	hardRemoveWorkspace=async (folderData: IWorkspace) => {
		const res = await this.repository.createWorkspace(folderData);

		return res;
	};
	

}
