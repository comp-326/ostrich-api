/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import { UserRoleUseCases } from './../use-cases';
import { WorkspaceMemberController } from './../controllers';
import workspaceMemberRepository from './../repository';


export default function updateMemberRoleRoute(app: Router){
	return (pathName: string) => {
		const workspaceMemberUseCase = new UserRoleUseCases(workspaceMemberRepository);
		const controller = new WorkspaceMemberController(workspaceMemberUseCase);
		const workspaceMemberRouter = Router();
		app.use(`${pathName}`, workspaceMemberRouter);
		workspaceMemberRouter.put('/member/update/role/:memberId', controller.changeMemberRole);

	};
}