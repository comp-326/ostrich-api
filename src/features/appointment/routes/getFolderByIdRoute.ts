/* eslint-disable @typescript-eslint/no-unused-vars */
import {AppointmentUseCase} from '../use-cases';
import FolderController from '../controllers';
import FolderRepository from '../repository';
import { Router } from 'express';


export default function getFolderByIdRoute(app:Router){
	return (pathName:string)=>{
		const folderUseCase = new AppointmentUseCase(FolderRepository);
		const controller = new FolderController(folderUseCase);
		const folderRouter = Router();
		app.use(`${pathName}`,folderRouter);
		folderRouter.get('/single/:folderId',controller.findById);

	};
}