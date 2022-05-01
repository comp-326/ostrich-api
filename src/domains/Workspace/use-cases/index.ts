// import makeAddUserUseCase from "./add-user-join"
import workspaceDB from '@ostrich-domains/Workspace/WorkspaceRepository';
import makeAddUserUseCase from '@ostrich-domains/Workspace/use-cases/add-workspace';
import makeEditLogoUseCase from '@ostrich-domains/Workspace/use-cases/edit-logo';
import makeEditWorkspaceUseCase from '@ostrich-domains/Workspace/use-cases/edit-workspace';
import makeListUserWorkspaceUseCase from '@ostrich-domains/Workspace/use-cases/list-user-workspaces';
import makeListWorkspaceUseCase from '@ostrich-domains/Workspace/use-cases/list-workspaces';

const addWorkspace = makeAddUserUseCase({ workspaceDB });
const editWorkspaceLogo = makeEditLogoUseCase({ workspaceDB });
const editWorkspace = makeEditWorkspaceUseCase({ workspaceDB });
const listUserWorkspaces = makeListUserWorkspaceUseCase({ workspaceDB });
const listWorkspaces = makeListWorkspaceUseCase({ workspaceDB });

export default Object.freeze({
	addWorkspace,
	editWorkspace,
	editWorkspaceLogo,
	listUserWorkspaces,
	listWorkspaces,
});

export {
	addWorkspace,
	editWorkspace,
	editWorkspaceLogo,
	listUserWorkspaces,
	listWorkspaces,
};
export type WorkspaceUseCaseType =
	| typeof addWorkspace
	| typeof editWorkspace
	| typeof editWorkspaceLogo
	| typeof listUserWorkspaces
	| typeof listWorkspaces
