import { Authorize, AuthorizeWorkspaceAdmin } from "../Middlewares/AuthJwt"
import { Router } from "express"
import {
	commentOnInstitution,
	createInstitution,
	likeInstitution,
	updateInstitution,
} from "../Services/Institution.service"
import {
	createIntakes,
	createWorkspace,
	createWorkspaceBilling,
	downgradeWorkspaceUser,
	inviteUserToWorkspace,
	userWorkspace,
} from "../Services/Workspace.service"
import { AuthorizeAdmin } from "../Middlewares/AuthJwt"
import {
	emptyCommentBody,
	emptyWorkspaceName,
} from "../Middlewares/form/form.validator"
import { checkWorkspaceExist, checkWorkspaceIfExist } from "../Middlewares/model/models.validators"

const router = Router()
// New workspace
router.post("/user/new", Authorize, emptyWorkspaceName,checkWorkspaceIfExist ,createWorkspace)
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
router.get("/user/workspace", Authorize, userWorkspace)
export default router


