/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import WorkspaceRepository from '@ostrich-app-features/workspaces/repository';
import { WorkspaceUseCase } from '@ostrich-app-features/workspaces/use-cases';
import { adminRequired } from '@ostrich-app/middlewares/Auth';
import workspaceController from '@ostrich-app-features/workspaces/controllers';

export  function getWorkspaces(app: Router) {
	return (pathName: string) => {
		const workspaceUseCase = new WorkspaceUseCase(WorkspaceRepository);
		const controller = new workspaceController(workspaceUseCase);
		const workspaceRouter = Router();
		app.use(`${pathName}`, workspaceRouter);
		workspaceRouter.post('/find/all', adminRequired,controller.findWorkspaces);
	};
}
