/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { listWorkspaces } from '@ostrich-app/domains/Workspace/use-cases';
import { IRequest } from '@ostrich-app/common/types';

export default function makeBuildGetWorkspaceController({
	get
}: {
	get: typeof listWorkspaces;
}){
	return async function (httpRequest: IRequest){
		const { limit, page } = httpRequest.query as any;

		const workspaces = await get(limit!, page!);
		return { statusCode: 200, body: { workspaces } };
	};
}
