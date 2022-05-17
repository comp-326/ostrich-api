/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import WorkspaceRepository from '@ostrich-app-features/workspaces/repository';
import { WorkspaceUseCase } from '@ostrich-app-features/workspaces/use-cases';
import { loginRequired  } from '@ostrich-app/middlewares/Auth';
import workspaceController from '@ostrich-app-features/workspaces/controllers';

export  function getWorkspaceByIdRoute(app: Router) {
	return (pathName: string) => {
		const workspaceUseCase = new WorkspaceUseCase(WorkspaceRepository);
		const controller = new workspaceController(workspaceUseCase);
		const workspaceRouter = Router();
		app.use(`${pathName}`, workspaceRouter);
		workspaceRouter.get('/info/:id',loginRequired, controller.findById);
	};
}
