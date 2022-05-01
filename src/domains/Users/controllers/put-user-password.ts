import { IUserRequest } from '../interfaces';
import { editPasswordUseCase } from '../use-cases';

export default function makeBuildEditUserPasswordController({
	update
}: {
	update: typeof editPasswordUseCase;
}) {
	return async function (httpRequest: IUserRequest) {
		const { resetToken } = httpRequest.params;

		await update(resetToken, httpRequest.body);
		return {
			statusCode: 200,
			body: { message: 'Password changed successfully' }
		};
	};
}
