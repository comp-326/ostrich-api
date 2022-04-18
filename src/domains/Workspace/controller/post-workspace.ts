import { addWorkspace } from '../use-cases';
import { IRequest } from '@root/common/types';

export default function makeBuildPostWorkspaceController({
	add
}: {
	add: typeof addWorkspace;
}) {
	return async function (httpRequest: IRequest) {
		const user = httpRequest.user;
		const workspaceData = httpRequest.body;

		const workspace = await add({ owner: user.userId, ...workspaceData });
		return { statusCode: 201, body: { workspace } };
	};
}
