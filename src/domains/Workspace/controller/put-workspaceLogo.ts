import { editWorkspaceLogo } from '../use-cases';
import { IRequest } from '@ostrich-app/common/types';

export default function makeBuildPutWorkspaceController({
	update
}: {
	update: typeof editWorkspaceLogo;
}){
	return async function (httpRequest: IRequest){
		// const { id } = httpRequest.params;
		const workspace = await update(httpRequest);
		return { statusCode: 200, body: { workspace } };
	};
}
