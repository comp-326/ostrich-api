import { IUserRequest } from '../interfaces';
import { editUserUseCase } from '../use-cases';
import uploadSDK from '@ostrich-upload';
import { deleteFile } from '@ostrich/src/utils/fileSystem';

export default function makeBuildUpdateByIdUserController({
	update
}: {
	update: typeof editUserUseCase;
}) {
	return async function (httpRequest: IUserRequest) {
		const { id } = httpRequest.params;
		if (httpRequest.file) {
			try {
				const { secure_url } = await uploadSDK.uploader.upload(
					httpRequest.file.path
				);
				httpRequest.body.avatar = secure_url;
				await deleteFile(httpRequest.file.path);
			} catch {
				console.log('error uploading file');
				await deleteFile(httpRequest.file.path);
			}
		}
		const todo = await update(id, httpRequest.body);
		return { statusCode: 200, body: todo };
	};
}
