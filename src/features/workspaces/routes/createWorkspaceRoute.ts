/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import WorkspaceRepository from '@ostrich-app/features/workspaces/repository';
import { WorkspaceUseCase } from '@ostrich-app/features/workspaces/use-cases';
import workspaceController from '@ostrich-app/features/workspaces/controllers';

export  function createWorkspaceRoute(app: Router) {
	return (pathName: string) => {
		const workspaceUseCase = new WorkspaceUseCase(WorkspaceRepository);
		const controller = new workspaceController(workspaceUseCase);
		const userRouter = Router();
		app.use(`${pathName}`, userRouter);
		userRouter.post('/create/', controller.createWorkspace);
	};
}
