/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import { WorkspaceMemberController } from '../controllers';
import { UserRoleUseCases } from '../use-cases';
import workspaceMemberRepository from '../repository';


export default function getWorkspaceMembersRoute(app: Router){
	return (pathName: string) => {
		const workspaceMemberUseCase = new UserRoleUseCases(workspaceMemberRepository);
		const controller = new UserRoleController(workspaceMemberUseCase);
		const workspaceMemberRouter = Router();
		app.use(`${pathName}`, workspaceMemberRouter);
		workspaceMemberRouter.put('/insert', controller.createRoles);

	};
}