/* eslint-disable @typescript-eslint/no-explicit-any */
import validateMongodbId from "@utils/mongo/ObjectId-validator"
import { ExpressError } from "@base/src/common/errors/ExpressError"

export default function makeJoinUserWorkspaceUsecase({
	workspaceDB,
}: {
	workspaceDB: any
}) {
	return async function joinUserToWorkspaceUseCase({
		userId,
		workspaceId,
	}: {
		userId: string
		workspaceId: string
	}) {
		if (!validateMongodbId(userId)) {
			throw new ExpressError("Invalid user id", 402)
		}
		if (!validateMongodbId(workspaceId)) {
			throw new ExpressError("Invalid workspace id", 402)
		}
		const existing = await workspaceDB.find()
		return existing
	}
}
