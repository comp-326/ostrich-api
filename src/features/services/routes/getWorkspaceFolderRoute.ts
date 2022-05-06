/* eslint-disable @typescript-eslint/no-unused-vars */
import FolderController from '../controllers';
import FolderRepository from '../repository';
import {FolderUseCase} from '../use-cases';
import { Router } from 'express';


export default function getWorkspaceFoldersRoute(app:Router){
	return (pathName:string)=>{
		const folderUseCase = new FolderUseCase(FolderRepository);
		const controller = new FolderController(folderUseCase);
		const folderRouter = Router();
		app.use(`${pathName}`,folderRouter);
		folderRouter.get('/workspace/:workspaceId',controller.copyServices);

	};
}