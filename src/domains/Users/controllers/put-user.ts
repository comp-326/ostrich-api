import { IUserRequest } from '../interfaces';
import { editUserUseCase } from '../use-cases';

export default function makeBuildUpdateByIdUserController({
	update
}: {
	update: typeof editUserUseCase;
}) {
	return async function (httpRequest: IUserRequest) {
		const { id } = httpRequest.params;
		if (httpRequest.file) {
			const { filename } = httpRequest.file;
			httpRequest.body.profilePic = {
				url: filename,
				public_id: new Date().getTime()
			};
		}
		const todo = await update(id, httpRequest.body);
		return { statusCode: 200, body: todo };
	};
}
