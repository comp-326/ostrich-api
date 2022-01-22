import { Authorize, AuthorizeWorkspaceAdmin } from "./../middlewares/AuthJwt"
import { Router } from "express"
import {
	commentOnInstitution,
	createInstitution,
	likeInstitution,
	updateInstitution,
} from "../controllers/Institution.controller"
import {
	createIntakes,
	createWorkspace,
	createWorkspaceBilling,
	downgradeWorkspaceUser,
	inviteUserToWorkspace,
	memberWorkspaces,
} from "../controllers/Workspace.controller"
import { AuthorizeAdmin } from "../middlewares/AuthJwt"
import {
	emptyCommentBody,
	emptyWorkspaceName,
} from "../middlewares/form/form.validator"
import { checkWorkspaceExist } from "../middlewares/model/models.validators"

const router = Router()
// New workspace
router.post("/user/new", Authorize, emptyWorkspaceName, createWorkspace)
// New staff
router.post("/:workspaceId/intake/new", AuthorizeAdmin, createIntakes)
// New institution
router.post(
	"/:workspaceId/institution/new",
	AuthorizeWorkspaceAdmin,
	checkWorkspaceExist,
	createInstitution,
)
// Update institution
router.put(
	"/:workspaceId/institution/update/:institutionId",
	AuthorizeAdmin,
	updateInstitution,
)
// Invite user to workspace
router.post(
	"/:workspaceId/invites",
	Authorize,
	checkWorkspaceExist,
	inviteUserToWorkspace,
)
// Downgrade user
router.put("/:workspaceId/:userId", downgradeWorkspaceUser)
// Create workspace billing
router.post("/:workspaceId/billing/create", createWorkspaceBilling)
// Like institution
router.put(
	"/:workspaceId/institution/:institutionId/like",
	Authorize,
	likeInstitution,
)
// Comment on institution
router.put(
	"/:workspaceId/institution/:institutionId/comment",
	Authorize,
	emptyCommentBody,
	commentOnInstitution,
)
// Get user workspaces
router.get("/user/workspaces", Authorize, memberWorkspaces)
export default router
