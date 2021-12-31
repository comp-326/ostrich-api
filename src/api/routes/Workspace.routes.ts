import { Router } from 'express'
import {
	commentOnInstitution,
	createInstitution,
	likeInstitution,
	updateInstitution,
} from '../controllers/Institution.controller'
import {
	createIntakes,
	createWorkspace,
	createWorkspaceBilling,
	downgradeWorkspaceUser,
	inviteUserToWorkspace,
} from '../controllers/Workspace.controller'
import { AuthorizeAdmin } from '../middlewares/AuthJwt'

const router = Router()
router.post('/user/new', AuthorizeAdmin, createWorkspace)
router.post('/:workspaceId/intake/new', AuthorizeAdmin, createIntakes)
router.post('/:workspaceId/institution/new', AuthorizeAdmin, createInstitution)
router.put(
	'/:workspaceId/institution/update/:institutionId',
	AuthorizeAdmin,
	updateInstitution,
)
router.post('/:workspaceId/invites', inviteUserToWorkspace)
router.put('/:workspaceId/:userId', downgradeWorkspaceUser)
router.post('/:workspaceId/billing/create', createWorkspaceBilling)
router.put('/:workspaceId/institution/:institutionId/like', likeInstitution)
router.put(
	'/:workspaceId/institution/:institutionId/comment',
	commentOnInstitution,
)

export default router
