/* eslint-disable @typescript-eslint/no-unused-vars */
import AppointmentController from '../controllers';
import {AppointmentUseCase} from '../use-cases';
import FolderRepository from '../repository';
import { Router } from 'express';


export default function copyFolderRoute(app:Router){
	return (pathName:string)=>{
		const folderUseCase = new AppointmentUseCase(FolderRepository);
		const controller = new AppointmentController(folderUseCase);
		const folderRouter = Router();
		app.use(`${pathName}`,folderRouter);
		folderRouter.put('/copy/:folderId',controller.copyFolder);

	};
}