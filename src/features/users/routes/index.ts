import { Router } from 'express';
import activateAccountRoute from './activateAccountRoute';
import deleteAccountRoute from './deleteUser.route';
import forgotPasswordRoute from './forgotPasswordRoute';
import getActivationLinkRoute from './getActivationLinkRoute';
import getUserByEmailRoute from './getUserByEmailRoute';
import getUserByIdRoute from './getUserByIdRoute';
import getUsersRoute from './getUsersRoute';
import newUserRoute from './newUserRoute';
import resetPasswordRoute from './resetPasswordRoute';
import updatePasswordRoute from './updateProfileRoute';


export default ({app,pathName}:{app:Router,pathName:string})=>{
	activateAccountRoute(app)(pathName);
	deleteAccountRoute(app)(pathName);
	forgotPasswordRoute(app)(pathName);
	getActivationLinkRoute(app)(pathName);
	getUserByEmailRoute(app)(pathName);
	getUserByIdRoute(app)(pathName);
	getUsersRoute(app)(pathName);
	newUserRoute(app)(pathName);
	resetPasswordRoute(app)(pathName);
	updatePasswordRoute(app)(pathName);
};