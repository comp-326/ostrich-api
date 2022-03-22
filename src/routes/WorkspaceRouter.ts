import { Router } from "express"
import wController from "../controllers/WorkspaceController"
import auth from "../middlewares/AuthMiddleware"
import uMiddleware from "../middlewares/UserMiddleware"
const router = Router()
/**
 * ******************* CREATE NEW PERSONAL WORKSPACE *******************
 */
router.route("/new").post(auth.loginRequired, wController.createWorkspace)
/**
 * ******************* REGISTER TO A WORKSPACE VIA LINK *****************
 */
router
	.route("/workspace/member/invite/register")
	.post(
		uMiddleware.validateRegistrationData,
		wController.userRegisterViaLink,
	)
/**
 * ****************** REGISTER NEW WORKSPACE MEMBER *********************
 */
router
	.route("/workspace/member/register")
	.post(auth.loginRequired,wController.createWorkspaceMember)
/**
 * ****************** GET SINGLE WORKSPACE DETAILS **********************
 */
router
	.route("/single/:id")
	.get(auth.loginRequired, wController.getWorkspaceById)
/**
 * ***************** CHANGE USER WORKSPACE ROLE *************************
 */
router
	.route("/workspace/member/role/change")
	.put(auth.loginRequired, wController.changeWorkspaceUserRole)
/**
 * ***************** UPDATE WORKSPACE ************************************
 */
router
	.route("/workspace/update/:id")
	.put(auth.loginRequired, wController.updateWorkspace)
/**
 * ***************** GET USER WORKSPACES *********************************
 */
router.route("/member").get(auth.loginRequired, wController.getUserWorkspaces)
/**
 * **************** INVITE USERS TO WORKSPACE ****************************
 */
router
	.route("/invite/:id")
	.post(auth.loginRequired, wController.inviteUsersToWorkspace)
/**
 * *************** GET ALL WORKSPACES ********************
 */
router.route("/all").get(auth.loginRequired, wController.getAllWorkspaces)


export default router
