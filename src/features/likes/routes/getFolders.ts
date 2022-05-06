/* eslint-disable @typescript-eslint/no-unused-vars */
import FolderController from '../controllers';
import FolderRepository from '../repository';
import {LikesUseCase} from '../use-cases';
import { Router } from 'express';


export default function getFoldersRoute( app: Router){
	return (pathName:string)=>{
		const folderUseCase = new LikesUseCase(FolderRepository);
		const controller = new FolderController(folderUseCase);
		const folderRouter = Router();
		app.use(`${pathName}`,folderRouter);
		folderRouter.get('/',controller.findFolders);

	};
}