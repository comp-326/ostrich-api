// import { BaseDomain } from '@ostrich-app/common/base/baseDomain';
// import { Router } from 'express';
// import api from './routes';

// const userRouter = Router();
// export default function userDomain(app: Router){
// 	app.use('/users', userRouter);
// 	// Update user
// 	api.makeUpdateUserApiCall(userRouter);
// 	// Query user by is
// 	api.makeQueryIdUserApiCall(userRouter);
// 	// Query user by email
// 	api.makeQueryEmailUserApiCall(userRouter);
// 	// Query users
// 	api.makeQueryUserApiCall(userRouter);
// 	// Delete user
// 	api.makeDeleteUserApiCall(userRouter);
// 	// Activate user
// 	api.makeUpdateActivateUserApiCall(userRouter);
// 	// Update user password
// 	api.makeUpdateUserPasswordApiCall(userRouter);
// 	// Ger password reset link
// 	api.makeQueryActivateAccountApiCall(userRouter);
// 	// Ger password reset link
// 	api.makeQueryGetPasswordResetApiCall(userRouter);
// 	return app;
// }

// class UserDomain extends BaseDomain{
// 	constructor(pathName:string,router:Router){
// 		super(pathName,router);
// 	}
// 	expose= () => {

// 		return this.expressRouter;
// 	};
	
// }
