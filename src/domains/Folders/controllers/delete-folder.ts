import { IFolderRequest } from '../interfaces';
import { removeFolderUseCase } from '../use-cases';

export default function makeBuildDeleteFolderController({
	remove
}: {
	remove: typeof removeFolderUseCase;
}){
	return async function (httpRequest: IFolderRequest){
		const { id } = httpRequest.params;
		await remove(id);
		return {
			statusCode: 200,
			body: { id, deleted: true }
		};
	};
}
