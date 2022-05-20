/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import {WorkspaceRoleController  } from '@ostrich-app-features/workspaceRoles/controllers';
import { WorkspaceRoleUseCases } from '@ostrich-app-features/workspaceRoles/use-cases';
import { adminRequired } from '@ostrich-app/middlewares/Auth';
import workspaceRolesRepository from '@ostrich-app-features/workspaceRoles/repository';


export default function postNewRolesRoute(app: Router) {
	return (pathName: string) => {
		const workspaceRolesUseCase = new WorkspaceRoleUseCases(workspaceRolesRepository);
		const controller = new WorkspaceRoleController(workspaceRolesUseCase);
		const folderRouter = Router();
		app.use(`${pathName}`, folderRouter);
		folderRouter.put('/insert', adminRequired, controller.createRoles);

	};
}