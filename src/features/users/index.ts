import { Router } from 'express';
import activateAccountRoute from '@ostrich-app/features/users/routes/activateAccountRoute';
import deleteAccountRoute from '@ostrich-app/features/users/routes/deleteUserRoute';
import forgotPasswordRoute from '@ostrich-app/features/users/routes/forgotPasswordRoute';
import getActivationLinkRoute from '@ostrich-app/features/users/routes/getActivationLinkRoute';
import getUserByEmailRoute from '@ostrich-app/features/users/routes/getUserByEmailRoute';
import getUserByIdRoute from '@ostrich-app/features/users/routes/getUserByIdRoute';
import getUsersRoute from '@ostrich-app/features/users/routes/getUsersRoute';
import newUserRoute from '@ostrich-app/features/users/routes/newUserRoute';
import resetPasswordRoute from '@ostrich-app/features/users/routes/resetPasswordRoute';
import updatePasswordRoute from '@ostrich-app/features/users/routes/updateProfileRoute';


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