/* eslint-disable @typescript-eslint/no-unused-vars */
import FolderController from '../controllers';
import NotificationRepository from '../repository';
import {NotificationUseCase} from '../use-cases';
import { Router } from 'express';


export default function deleteFolderRoute(app:Router){
	return (pathName:string)=>{
		const folderUseCase = new NotificationUseCase(NotificationRepository);
		const controller = new FolderController(folderUseCase);
		const folderRouter = Router();
		app.use(`${pathName}`,folderRouter);
		folderRouter.delete('/delete/:folderId',controller.copyNotification);

	};
}