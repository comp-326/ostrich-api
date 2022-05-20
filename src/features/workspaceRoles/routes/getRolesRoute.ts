/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import { WorkspaceRoleController } from '@ostrich-app-features/workspaceRoles/controllers';
import { WorkspaceRoleUseCases } from '@ostrich-app-features/workspaceRoles/use-cases';
import { loginRequired } from '@ostrich-app/middlewares/Auth';
import workspaceRolesRepository from '@ostrich-app-features/workspaceRoles/repository';

export default function getWorkspaceRolesRoute(app: Router) {
	return (pathName: string) => {
		const workspaceRolesUseCase = new WorkspaceRoleUseCases(workspaceRolesRepository);
		const controller = new WorkspaceRoleController(workspaceRolesUseCase);
		const folderRouter = Router();
		app.use(`${pathName}`, folderRouter);
		folderRouter.get('/all', loginRequired, controller.getRoles);
	};
}
