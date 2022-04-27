import { BASE_URL, PORT } from '../config';
import { NODE_ENV } from '@ostrich-config';

/**
 *
 * @param {{role:string,workspaceId:string}} param0
 * @returns
 */
function createWorkspaceInviteLink({
	role,
	workspaceId
}: {
	role: string;
	workspaceId: string;
}) {
	return `http://localhost:${PORT}/invite/workspace?role=${role}&workspaceId=${workspaceId}`;
}

/**
 *
 * @param {string} param0
 * @returns
 */
function createAccountActivationLink({ token }: { token: string }) {
	return `http://localhost:${PORT}/account/activate/${token}`;
}
/**
 *
 * @param {{baseUrl:string,token:string}} param0
 * @returns
 */
function createForgotPasswordLink(token: string) {
	const baseUrl =
		NODE_ENV === ('development' || 'testing')
			? `http://localhost:${PORT}/api/v1/users/account/password/reset/${token}`
			: `${BASE_URL}/api/v1/users/account/password/reset/${token}`;

	return baseUrl;
}
export {
	createWorkspaceInviteLink,
	createAccountActivationLink,
	createForgotPasswordLink
};
export default Object.freeze({
	createWorkspaceInviteLink,
	createAccountActivationLink,
	createForgotPasswordLink
});
