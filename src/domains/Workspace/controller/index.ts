import {
	addWorkspace,
	editWorkspace,
	editWorkspaceLogo,
	listUserWorkspaces,
	listWorkspaces,
} from "../use-cases"
import makeBuildGetUserWorkspaces from "./get-user-workspace"
import makeBuildGetWorkspaces from "./get-workspace"
import makeBuildPostWorkspace from "./post-workspace"
import makeBuildPutWorkspace from "./put-workspace"
import makeBuildPutWorkspaceLogo from "./put-workspaceLogo"

const postWorkspace = makeBuildPostWorkspace({ add: addWorkspace })
const getUserWorkspaces = makeBuildGetUserWorkspaces({
	get: listUserWorkspaces,
})

const getWorkspaces = makeBuildGetWorkspaces({ get: listWorkspaces })
const putWorkspace = makeBuildPutWorkspace({ update: editWorkspace })
const putWorkspaceLogo = makeBuildPutWorkspaceLogo({
	update: editWorkspaceLogo,
})

export default Object.freeze({
	getWorkspaces,
	putWorkspace,
	putWorkspaceLogo,
	postWorkspace,
	getUserWorkspaces,
})
export {
	getWorkspaces,
	putWorkspace,
	putWorkspaceLogo,
	postWorkspace,
	getUserWorkspaces,
}

export type WorkspaceControllerType =
	| typeof getWorkspaces
	| typeof putWorkspace
	| typeof putWorkspaceLogo
	| typeof postWorkspace
	| typeof getUserWorkspaces
