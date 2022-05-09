/* eslint-disable @typescript-eslint/no-unused-vars */
import { INext, IRequest, IResponse } from '@ostrich-app-common/types';
import { IWorkspaceInviteController, IWorkspaceInviteUseCase } from '../interfaces';

export class WorkspaceInviteController implements IWorkspaceInviteController{

	constructor(private readonly useCase: IWorkspaceInviteUseCase){
	}

	createInvite=async (req: IRequest, res: IResponse, next: INext) =>{
		try{
			await this.useCase.inviteUserToWorkspace(req.body);

			return res.sendStatus(201);
		}catch(err){
			return next(err);
		}
	};

	deleteInvite=async (req: IRequest, res: IResponse, next: INext) =>{
		return {};
	};

	confirmInvite=async (req: IRequest, res: IResponse, next: INext) =>{
		return {};
	};

	updateInvite=async (req: IRequest, res: IResponse, next: INext) =>{
		return {};
	};

	getPendingInvites=async (req: IRequest, res: IResponse, next: INext) =>{
		return {};
	};

	getConfirmedInvites=async (req: IRequest, res: IResponse, next: INext) =>{
		return {};
	};

	rejectInvite=async (req: IRequest, res: IResponse, next: INext) =>{
		return {};
	};


}