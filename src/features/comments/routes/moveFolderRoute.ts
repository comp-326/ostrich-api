/* eslint-disable @typescript-eslint/no-unused-vars */
import CommentsRepository from '../repository';
import {CommentsUseCase} from '../use-cases';
import FolderController from '../controllers';
import { Router } from 'express';


export default function moveFolderRoute(app:Router){
	return (pathName:string)=>{
		const folderUseCase = new CommentsUseCase(CommentsRepository);
		const controller = new FolderController(folderUseCase);
		const folderRouter = Router();
		app.use(`${pathName}`,folderRouter);
		folderRouter.put('/folder/move/:folderId',controller.copyComments);

	};
}