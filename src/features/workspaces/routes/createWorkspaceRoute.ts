/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import WorkspaceRepository from './../repository';
import { WorkspaceUseCase } from './../use-cases';
import { loginRequired  } from '@ostrich-app/middlewares/Auth';
import workspaceController from './../controllers';

export  function createWorkspaceRoute(app: Router) {
	return (pathName: string) => {
		const workspaceUseCase = new WorkspaceUseCase(WorkspaceRepository);
		const controller = new workspaceController(workspaceUseCase);
		const workspaceRouter = Router();
		app.use(`${pathName}`, workspaceRouter);
		workspaceRouter.post('/create/', loginRequired,controller.createWorkspace);
	};
}
