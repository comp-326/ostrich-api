/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { INext, IRequest, IResponse } from '@ostrich-app-common/types';
import {
	IWorkspaceController,
	IWorkspaceUseCases
} from '@ostrich-app-features/workspaces/interfaces';

class FolderController implements IWorkspaceController {

	constructor(private readonly useCase: IWorkspaceUseCases) { }

	softDelete = async (req: IRequest, res: IResponse, next: INext) => {
		const response = await this.useCase.addWorkspace(req.body);

		return response;
	};

	findById = async (req: IRequest, res: IResponse, next: INext) => {
		const { id } = req.params;
		const response = await this.useCase.listWorkspaceById(id);

		return response;
	};

	findWorkspaces = async (req: IRequest, res: IResponse, next: INext) => {
		try {
			const { limit, offset } = req.query as unknown as { limit: number; offset: number };
			const response = await this.useCase.listWorkspaces(limit, offset);

			return response;
		} catch (error) {
			return next(error);
		}
	};

	findByName = async (req: IRequest, res: IResponse, next: INext) => {
		const response = await this.useCase.addWorkspace(req.body);

		return response;
	};

	findUserWorkspaces = async (req: IRequest, res: IResponse, next: INext) => {
		try {
			const { limit, offset } = req.query as unknown as { limit: string, offset: string };
			const { userId } = req.params;
			const response = await this.useCase.listUserWorkspaces(userId, { limit: limit ? parseInt(limit) : 10, offset: offset ? parseInt(offset) : 1 });

			return response;
		} catch (error) {
			return next(error);
		}
	};

	createWorkspace = async (req: IRequest, res: IResponse, next: INext) => {
		try {

			await this.useCase.addWorkspace(req.body);

			return res.sendStatus(201);
		} catch (err) {
			return next(err);
		}
	};

	copyWorkspace = async (req: IRequest, res: IResponse, next: INext) => {
		const response = await this.useCase.addWorkspace(req.body);

		return response;
	};

	updateWorkspace = async (req: IRequest, res: IResponse, next: INext) => {
		try {
			await this.useCase.editWorkspace(req.params.id, req.body);

			return res.sendStatus(200);
		} catch (err) {
			return next(err);
		}
	};

	moveWorkspace = async (req: IRequest, res: IResponse, next: INext) => {
		const response = await this.useCase.addWorkspace(req.body);

		return response;
	};

	hardDeleteWorkspace = async (req: IRequest, res: IResponse, next: INext) => {
		const response = await this.useCase.addWorkspace(req.body);

		return response;
	};
}

export default FolderController;
