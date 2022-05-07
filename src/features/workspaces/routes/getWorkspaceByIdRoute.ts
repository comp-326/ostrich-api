/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import WorkspaceRepository from '@ostrich-app/features/workspaces/repository';
import { WorkspaceUseCase } from '@ostrich-app/features/workspaces/use-cases';
import workspaceController from '@ostrich-app/features/workspaces/controllers';

export  function getWorkspaceByIdRoute(app: Router) {
	return (pathName: string) => {
		const userUseCase = new WorkspaceUseCase(WorkspaceRepository);
		const controller = new workspaceController(userUseCase);
		const userRouter = Router();
		app.use(`${pathName}`, userRouter);
		userRouter.post('/find/:id', controller.findById);
	};
}
