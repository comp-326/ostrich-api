/* eslint-disable @typescript-eslint/no-unused-vars */
import NotificationController from '../controllers';
import NotificationRepository from '../repository';
import {NotificationUseCase} from '../use-cases';
import { Router } from 'express';


export default function getNotificationsRoute( app: Router){
	return (pathName:string)=>{
		const notificationUseCase = new NotificationUseCase(NotificationRepository);
		const controller = new NotificationController(notificationUseCase);
		const NotificationRouter = Router();
		app.use(`${pathName}`,NotificationRouter);
		NotificationRouter.get('/',controller.findNotifications);

	};
}