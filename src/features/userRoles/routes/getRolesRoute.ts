/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import { UserRoleController } from '@ostrich-app-features/userRoles/controllers';
import { UserRoleUseCases } from '@ostrich-app-features/userRoles/use-cases';
import { adminRequired } from '@ostrich-app/middlewares/Auth';
import userRolesRepository from '@ostrich-app-features/userRoles/repository';


export default function getUserRolesRoute(app: Router){
	return (pathName: string) => {
		const userRolesUseCase = new UserRoleUseCases(userRolesRepository);
		const controller = new UserRoleController(userRolesUseCase);
		const folderRouter = Router();
		app.use(`${pathName}`, folderRouter);
		folderRouter.get('/all', adminRequired,controller.getRoles);

	};
}