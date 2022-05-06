import { Router } from 'express';
import copyFolderRoute from './copyFolderRoute';


export default ({app,pathName}:{app:Router,pathName:string})=>{
	copyFolderRoute(app)(pathName);
};