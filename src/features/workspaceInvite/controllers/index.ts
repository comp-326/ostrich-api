/* eslint-disable @typescript-eslint/no-unused-vars */
import { INext, IRequest, IResponse } from '@ostrich-app-common/types';
import { IWorkspaceInviteController, IWorkspaceInviteUseCase } from '../interfaces';

export class WorkspaceInviteController implements IWorkspaceInviteController{
	private readonly useCase: IWorkspaceInviteUseCase;

	constructor(useCase: IWorkspaceInviteUseCase){
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