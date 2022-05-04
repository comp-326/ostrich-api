import { IFolderRequest } from '../interfaces';
import { editFolderUseCase } from '../use-cases';

export default function makeBuildUpdateByIdFolderController({
	update
}: {
	update: typeof editFolderUseCase;
}){
	return async function (httpRequest: IFolderRequest){
		const { id } = httpRequest.params;
		const folder = await update(id, httpRequest.body);
		return { statusCode: 200, body: { folder } };
	};
}
