/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import { WorkspaceMemberController } from './../controllers';
import { WorkspaceUseCases } from './../use-cases';
import  { loginRequired } from '@ostrich-app/middlewares/Auth';
import workspaceMemberRepository from './../repository';

export default function updateMemberRoleRoute(app: Router){
	return (pathName: string) => {
		const workspaceMemberUseCase = new WorkspaceUseCases(workspaceMemberRepository);
		const controller = new WorkspaceMemberController(workspaceMemberUseCase);
		const workspaceMemberRouter = Router();
		app.use(`${pathName}`, workspaceMemberRouter);
		workspaceMemberRouter.put('/member/update/role/:memberId', loginRequired,controller.changeMemberRole);

	};
}