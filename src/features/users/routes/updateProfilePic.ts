/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import UserController from '@ostrich-app-features/users/controllers';
import UserRepository from '@ostrich-app-features/users/repository';
import { UserUseCase } from '@ostrich-app-features/users/use-cases';
import { imageUpload } from '@ostrich-app-uploader';

export default function updateProfilePicRoute(app: Router){
	return (pathName: string) => {
		const userUseCase = new UserUseCase(UserRepository);
		const controller = new UserController(userUseCase);
		const userRouter = Router();
		app.use(`${pathName}`, userRouter);
		userRouter.put('/account/profile/avatar/:id', imageUpload.single('avatar'),controller.updateProfilePic);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
	};
}