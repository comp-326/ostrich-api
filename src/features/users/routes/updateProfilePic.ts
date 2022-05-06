/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import UserController from '../controllers';
import UserRepository from '../repository';
import { UserUseCase } from '../use-cases';
import { imageUpload } from '@ostrich-app/uploader';

export default function updateProfilePicRoute(app: Router){
	return (pathName: string) => {
		const userUseCase = new UserUseCase(UserRepository);
		const controller = new UserController(userUseCase);
		const userRouter = Router();
		app.use(`${pathName}`, userRouter);
		userRouter.put('/account/profile/avatar/:id', imageUpload.single('avatar'),controller.updateProfilePic);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
	};
}