import { IFolderRequest } from '../interfaces';
import { listFolderByNameUseCase } from '../use-cases';

export default function makeBuildFindByNameFolderController({
	listByName
}: {
	listByName: typeof listFolderByNameUseCase;
}){
	return async function (httpRequest: IFolderRequest){
		const { name } = httpRequest.query;

		const folder = await listByName(name);
		return { statusCode: 200, body: { folder } };
	};
}
