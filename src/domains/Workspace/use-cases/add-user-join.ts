/* eslint-disable @typescript-eslint/no-explicit-any */
import validateMongodbId from '@ostrich-app/utils/mongo/ObjectId-validator';
import { ExpressError } from '@ostrich-app/common/errors/ExpressError';

export default function makeJoinUserWorkspaceUsecase({
	workspaceDB
}: {
	workspaceDB: any;
}){
	return async function joinUserToWorkspaceUseCase({
		userId,
		workspaceId
	}: {
		userId: string;
		workspaceId: string;
	}){
		if (!validateMongodbId(userId)) {
			throw new ExpressError({
				message: 'Invalid user id',
				data: {},
				status: 'warning',
				statusCode: 400
			});
		}
		if (!validateMongodbId(workspaceId)) {
			throw new ExpressError({
				message: 'Invalid workspace id',
				data: {},
				status: 'warning',
				statusCode: 400
			});
		}
		const existing = await workspaceDB.find();
		return existing;
	};
}
