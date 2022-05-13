/* eslint-disable @typescript-eslint/no-unused-vars */
import { INext, IRequest, IResponse } from '@ostrich-app-common/types';
import { IWorkspaceInviteController, IWorkspaceInviteUseCase } from '../interfaces';

export class WorkspaceInviteController implements IWorkspaceInviteController {

	constructor(private readonly useCase: IWorkspaceInviteUseCase) {
	}

	createInvite = async (req: IRequest, res: IResponse, next: INext) => {
		try {
			await this.useCase.inviteUserToWorkspace(req.body);

			return res.sendStatus(201);
		} catch (err) {
			return next(err);
		}
	};

	deleteInvite = async (req: IRequest, res: IResponse, next: INext) => {
		return {};
	};

	confirmInvite = async (req: IRequest, res: IResponse, next: INext) => {
		return {};
	};

	updateInvite = async (req: IRequest, res: IResponse, next: INext) => {
		try{
			await this.useCase.updateExistingInviteById(req.params.inviteId,req.body);

			return res.sendStatus(200);
		}catch(err){
			return next(err);
		}
	};

	getPendingInvites = async (req: IRequest, res: IResponse, next: INext) => {
		try{
			const invites = await this.useCase.getPendingInvites(req.params.inviteId);

			return res.status(200).json({invites});
		}catch(err){
			return next(err);
		}
	};

	getConfirmedInvites = async (req: IRequest, res: IResponse, next: INext) => {
		try{
			const invites = await this.useCase.getPendingInvites(req.params.inviteId);

			return res.status(200).json({invites});
		}catch(err){
			return next(err);
		}
	};

	rejectInvite = async (req: IRequest, res: IResponse, next: INext) => {
		return {};
	};


}