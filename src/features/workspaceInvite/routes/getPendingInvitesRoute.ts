/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import { WorkspaceInviteController } from './../controllers';
import { WorkspaceInviteUseCases } from './../use-cases';
import workspaceInviteRepository from './../repository';


export default function getPendingInvitesRoute(app: Router){
	return (pathName: string) => {
		const userRolesUseCase = new WorkspaceInviteUseCases(workspaceInviteRepository);
		const controller = new WorkspaceInviteController(userRolesUseCase);
		const folderRouter = Router();
		app.use(`${pathName}`, folderRouter);
		folderRouter.put('/workspace/pending', controller.getPendingInvites);

	};
}

