/* eslint-disable @typescript-eslint/no-unused-vars */
import FolderController from '../controllers';
import FolderRepository from '../repository';
import {NotificationUseCase} from '../use-cases';
import { Router } from 'express';


export default function getFolderByIdRoute(app:Router){
	return (pathName:string)=>{
		const folderUseCase = new NotificationUseCase(FolderRepository);
		const controller = new FolderController(folderUseCase);
		const folderRouter = Router();
		app.use(`${pathName}`,folderRouter);
		folderRouter.get('/single/:folderId',controller.findById);

	};
}