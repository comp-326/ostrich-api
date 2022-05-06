import { Router } from 'express';
import copyFolderRoute from './copyFolderRoute';
import deleteFolderRoute from './deleteFolderRoute';
import getFolderByIdRoute from './getFolderByIdRoute';
import getFolderByNameRoute from './getFolderByNameRoute';
import getFoldersRoute from './getFolders';
import getWorkspaceFoldersRoute from './getWorkspaceFolderRoute';
import moveFolderRoute from './moveFolderRoute';
import newFolderRoute from './newFolderRoute';
import updateFolderRoute from './updateFolderRoute';


export default ({app,pathName}:{app:Router,pathName:string})=>{
	copyFolderRoute(app)(pathName);
	deleteFolderRoute(app)(pathName);
	getFolderByIdRoute(app)(pathName);
	getFolderByNameRoute(app)(pathName);
	getFoldersRoute(app)(pathName);
	getWorkspaceFoldersRoute(app)(pathName);
	moveFolderRoute(app)(pathName);
	newFolderRoute(app)(pathName);
	updateFolderRoute(app)(pathName);
};