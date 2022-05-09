/* eslint-disable @typescript-eslint/no-unused-vars */
import { INext, IRequest, IResponse } from '@ostrich-app-common/types';
import { IWorkspaceMemberController, IWorkspaceMemberUseCase } from './../interfaces';

export class WorkspaceMemberController implements IWorkspaceMemberController{

	constructor(private readonly useCase: IWorkspaceMemberUseCase){
	}

	joinWorkspace=async(req: IRequest, res: IResponse, next: INext) => {
		await this.useCase.joinWorkspace('','','');

		return {};
	};

	createMember=async (req: IRequest, res: IResponse, next: INext) => {
		return {};
	};

	changeMemberRole=async (req: IRequest, res: IResponse, next: INext) => {
		return {};
	};

	getMembers=async (req: IRequest, res: IResponse, next: INext) => {
		return {};
	};

	getMembersByRole=async (req: IRequest, res: IResponse, next: INext) => {
		return {};
	};

}