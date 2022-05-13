/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import { WorkspaceMemberController } from '@ostrich-app-features/workspaceMember/controllers';
import { WorkspaceUseCases } from '@ostrich-app-features/workspaceMember/use-cases';
import workspaceMemberRepository from '@ostrich-app-features/workspaceMember/repository';


export default function removeWorkspaceMemberRoute(app: Router){
	return (pathName: string) => {
		const workspaceMemberUseCase = new WorkspaceUseCases(workspaceMemberRepository);
		const controller = new WorkspaceMemberController(workspaceMemberUseCase);
		const workspaceMemberRouter = Router();
		app.use(`${pathName}`, workspaceMemberRouter);
		workspaceMemberRouter.put('/member/remove/:memberId', controller.removeMember);

	};
}