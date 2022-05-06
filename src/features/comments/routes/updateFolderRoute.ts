/* eslint-disable @typescript-eslint/no-unused-vars */
import {CommentsUseCase} from '../use-cases';
import FolderController from '../controllers';
import FolderRepository from '../repository';
import { Router } from 'express';


export default function updateFolderRoute(app:Router){
	return (pathName:string)=>{
		const folderUseCase = new CommentsUseCase(FolderRepository);
		const controller = new FolderController(folderUseCase);
		const folderRouter = Router();
		app.use(`${pathName}`,folderRouter);
		folderRouter.put('/folder/update/:folderId',controller.copyComments);

	};
}