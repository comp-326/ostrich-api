/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import { WorkspaceInviteController } from './../controllers';
import { WorkspaceInviteUseCases } from './../use-cases';
import { loginRequired } from '@ostrich-app/middlewares/Auth';
import workspaceInviteRepository from './../repository';


export default function getConfirmedInvitesRoute(app: Router){
	return (pathName: string) => {
		const workspaceInviteUseCase = new WorkspaceInviteUseCases(workspaceInviteRepository);
		const controller = new WorkspaceInviteController(workspaceInviteUseCase);
		const workspaceInviteRouter = Router();
		app.use(`${pathName}`, workspaceInviteRouter);
		workspaceInviteRouter.put('/workspace/invites/confirmed/:workspaceId', loginRequired,controller.getConfirmedInvites);

	};
}
