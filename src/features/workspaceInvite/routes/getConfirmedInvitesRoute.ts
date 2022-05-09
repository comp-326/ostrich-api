/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import { WorkspaceInviteController } from './../controllers';
import { WorkspaceInviteUseCases } from './../use-cases';
import workspaceInviteRepository from './../repository';


export default function getConfirmedInvitesRoute(app: Router){
	return (pathName: string) => {
		const userRolesUseCase = new WorkspaceInviteUseCases(workspaceInviteRepository);
		const controller = new WorkspaceInviteController(userRolesUseCase);
		const folderRouter = Router();
		app.use(`${pathName}`, folderRouter);
		folderRouter.put('/workspace/confirmed', controller.getConfirmedInvites);

	};
}
