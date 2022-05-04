import { listUserWorkspaces } from '@ostrich-app/domains/Workspace/use-cases';
import { IRequest } from '@ostrich-app/common/types';

export default function makeBuildGetUserWorkspacesController({
	get
}: {
	get: typeof listUserWorkspaces;
}){
	return async function (httpRequest: IRequest){
		const userId = httpRequest.user.userId;
		const workspaces = await get(userId);

		return { statusCode: 200, body: { workspaces } };
	};
}
