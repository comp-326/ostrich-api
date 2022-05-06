/* eslint-disable @typescript-eslint/no-unused-vars */
import FolderController from '../controllers';
import FolderRepository from '../repository';
import {NotificationUseCase} from '../use-cases';
import { Router } from 'express';


export default function moveFolderRoute(app:Router){
	return (pathName:string)=>{
		const folderUseCase = new NotificationUseCase(FolderRepository);
		const controller = new FolderController(folderUseCase);
		const folderRouter = Router();
		app.use(`${pathName}`,folderRouter);
		folderRouter.put('/folder/move/:folderId',controller.copyNotification);

	};
}