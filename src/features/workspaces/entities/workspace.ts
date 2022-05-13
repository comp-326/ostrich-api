import { ExpressError } from '@ostrich-app/common/errors/ExpressError';
import { IWorkspace } from '@ostrich-app-features/workspaces/models/interfaces';
import validateMongodbId from '@ostrich-app/utils/mongo/ObjectId-validator';

export default function makeCreateWorkspaceEntity(){
	return  function createUser({
		logo,name,ownerId,type
	}: IWorkspace){
		if(!ownerId){
			throw new ExpressError({
				message: 'OwnerId is required',
				statusCode: 400,
				status:'warning',
				data:{}
			});
		}
		if(!validateMongodbId(ownerId)){
			throw new ExpressError({
				message: 'OwnerId is not valid',
				statusCode: 400,
				status:'warning',
				data:{}
			});
		}
		if(!name){
			throw new ExpressError({
				message: 'Name is required',
				statusCode: 400,
				status:'warning',
				data:{}
			});
		}
		if(!type)
			type='personal';
        

		return Object.freeze({
			getLogo: () => logo,
			getName: () => name,
			getOwnerId: () => ownerId,
			getType: () => type,

		});
	};
}
