/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import { UserRoleUseCases } from '@ostrich-app-features/workspaceMember/use-cases';
import { WorkspaceMemberController } from '@ostrich-app-features/workspaceMember/controllers';
import workspaceMemberRepository from '@ostrich-app-features/workspaceMember/repository';


export default function addWorkspaceMemberRoute(app: Router){
	return (pathName: string) => {
		const workspaceMemberUseCase = new UserRoleUseCases(workspaceMemberRepository);
		const controller = new WorkspaceMemberController(workspaceMemberUseCase);
		const workspaceMemberRouter = Router();
		app.use(`${pathName}`, workspaceMemberRouter);
		workspaceMemberRouter.put('/member/new', controller.createMember);

	};
}