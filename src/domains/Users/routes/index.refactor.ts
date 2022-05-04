import { Router } from 'express';

class UserDomain{
	protected expressRouter: Router;
	constructor(path:string,router: Router){
		this.expressRouter = router;
	}

	expose=()=>{
		return  this.expressRouter;
	};
}

export default UserDomain;