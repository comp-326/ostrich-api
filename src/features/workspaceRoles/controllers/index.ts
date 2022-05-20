/* eslint-disable @typescript-eslint/no-unused-vars */
import { INext, IRequest, IResponse } from '@ostrich-app-common/types';
import { IWorkspaceRoleController, IWorkspaceRoleUseCase } from './../interfaces';

export class WorkspaceRoleController implements IWorkspaceRoleController{
	private readonly useCase: IWorkspaceRoleUseCase;

	constructor(useCase: IWorkspaceRoleUseCase){
		this.useCase = useCase;
	}

	createRoles = async (req: IRequest, res: IResponse, next: INext) => {
		const response = await this.useCase.addRoles();

		return res.status(201).json({ data: response });
	};

	getRoles = async (req: IRequest, res: IResponse, next: INext) => {
		const response = await this.useCase.listRoles();

		return res.status(200).json({ data: response });
	};

}