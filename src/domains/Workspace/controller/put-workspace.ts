import { editWorkspace } from '@ostrich-app/domains/Workspace/use-cases';
import { IRequest } from '@ostrich-app/common/types';
export default function makeBuildPutWorkspaceController({
	update
}: {
	update: typeof editWorkspace;
}){
	return async function (httpRequest: IRequest){
		const { id } = httpRequest.params;

		const user = httpRequest.user;
		if (httpRequest.file) {
			httpRequest.body.logo = {
				public_id: new Date().getTime(),
				url: httpRequest.file.filename
			};
		}
		const workspace = await update(id, {
			owner: user.userId,
			...httpRequest.body
		});
		return { statusCode: 200, body: { workspace } };
	};
}
