/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import { WorkspaceMemberController } from '../controllers';
import { WorkspaceUseCases } from '../use-cases';
import workspaceMemberRepository from '../repository';


export default function getWorkspaceMembersRoute(app: Router){
	return (pathName: string) => {
		const workspaceMemberUseCase = new WorkspaceUseCases(workspaceMemberRepository);
		const controller = new WorkspaceMemberController(workspaceMemberUseCase);
		const workspaceMemberRouter = Router();
		app.use(`${pathName}`, workspaceMemberRouter);
		workspaceMemberRouter.put('/', controller.getMembersByRole);

	};
}