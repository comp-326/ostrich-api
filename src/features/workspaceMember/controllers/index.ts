/* eslint-disable @typescript-eslint/no-unused-vars */
import { INext, IRequest, IResponse } from '@ostrich-app-common/types';
import { IWorkspaceMemberController, IWorkspaceMemberUseCase } from './../interfaces';

export class WorkspaceMemberController implements IWorkspaceMemberController {

	constructor(private readonly useCase: IWorkspaceMemberUseCase) {
	}

	getMembersByRole = async (req: IRequest, res: IResponse, next: INext) => {
		try {
			const members = await this.useCase.listMemberByRole(req.params.workspaceId, req.params.roleId);

			return res.status(200).json(members);
		} catch (err) {
			return next(err);
		}
	};

	removeMember = async (req: IRequest, res: IResponse, next: INext) => {
		try {
			await this.useCase.removeMember(req.params.memberId);
		}
		catch (err) {
			return next(err);
		}
	};

	joinWorkspace = async (req: IRequest, res: IResponse, next: INext) => {
		try {
			await this.useCase.addMember(req.body);

			return res.sendStatus(201);
		} catch (err) {
			return next(err);
		}
	};

	createMember = async (req: IRequest, res: IResponse, next: INext) => {
		try {
			await this.useCase.addMember(req.body);
		} catch (err) {
			return next(err);
		}
	};

	changeMemberRole = async (req: IRequest, res: IResponse, next: INext) => {
		try {
			await this.useCase.changeMemberRole(req.params.workspaceId, req.params.memberId, req.params.memberRoleId);

			return res.sendStatus(200);
		}
		catch (err) {
			return next(err);
		}
	};

	getMembers = async (req: IRequest, res: IResponse, next: INext) => {
		try {
			const members = await this.useCase.listMembers(req.params.workspaceId, req.params.limit ? parseInt(req.params.limit) : 20, req.params.page ? parseInt(req.params.page) : 1);

			return res.status(200).json({ members });
		} catch (err) {
			return next(err);
		}
	};

	getMember = async (req: IRequest, res: IResponse, next: INext) => {
		try {
			const member = await this.useCase.listIndividualMember(req.params.memberId);

			return res.status(200).json({ member });
		} catch (err) {
			return next(err);
		}
	};

}