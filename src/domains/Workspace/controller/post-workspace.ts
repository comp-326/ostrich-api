import { addWorkspace } from '@ostrich-app/domains/Workspace/use-cases';
import { IRequest } from '@ostrich-app/common/types';

export default function makeBuildPostWorkspaceController({
	add
}: {
	add: typeof addWorkspace;
}){
	return async function (httpRequest: IRequest){
		const user = httpRequest.user;
		const workspaceData = httpRequest.body;

		const workspace = await add({ owner: user.userId, ...workspaceData });
		return { statusCode: 201, body: { workspace } };
	};
}
