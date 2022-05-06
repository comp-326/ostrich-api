/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import WorkspaceController from '../controllers';
import WorkspaceRpository from '../repository';
import {WorkspaceUseCase} from '../use-cases';


export default function copyFolderRoute(app:Router){
	return (pathName:string)=>{
		const workspaceUsecase = new WorkspaceUseCase(WorkspaceRpository);
		const controller = new WorkspaceController(workspaceUsecase);
		const folderRouter = Router();
		app.use(`${pathName}`,folderRouter);
		folderRouter.put('/copy/:folderId',controller.copyFolder);

	};
}