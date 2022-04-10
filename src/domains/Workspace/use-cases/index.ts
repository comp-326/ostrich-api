// import makeAddUserUseCase from "./add-user-join"
import workspaceDB from "../WorkspaceRepository"
import makeAddUserUseCase from "./add-workspace"
import makeEditLogoUseCase from "./edit-logo"
import makeEditWorkspaceUseCase from "./edit-workspace"
import makeListUserWorkspaceUseCase from "./list-user-workspaces"
import makeListWorkspaceUseCase from "./list-workspaces"

const addWorkspace = makeAddUserUseCase({ workspaceDB })
const editWorkspaceLogo = makeEditLogoUseCase({ workspaceDB })
const editWorkspace = makeEditWorkspaceUseCase({ workspaceDB })
const listUserWorkspaces = makeListUserWorkspaceUseCase({ workspaceDB })
const listWorkspaces = makeListWorkspaceUseCase({ workspaceDB })

export default Object.freeze({
	addWorkspace,
	editWorkspace,
	editWorkspaceLogo,
	listUserWorkspaces,
	listWorkspaces,
})

export {
	addWorkspace,
	editWorkspace,
	editWorkspaceLogo,
	listUserWorkspaces,
	listWorkspaces,
}
export type WorkspaceUseCaseType =
	| typeof addWorkspace
	| typeof editWorkspace
	| typeof editWorkspaceLogo
	| typeof listUserWorkspaces
	| typeof listWorkspaces
