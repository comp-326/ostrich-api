import { Router } from 'express';

interface IBaseDomain{
    expressRouter:Router
    expose:()=>Router
}

export abstract class BaseDomain implements IBaseDomain{
	public expressRouter: Router;
	private _pathName:string;
	constructor(pathName:string,router:Router){
		this.expressRouter=router;
		this._pathName = `/api/v1/${pathName}`;
	}

	public get pathName(){
		return this._pathName;
	}


	abstract expose:()=>Router
}