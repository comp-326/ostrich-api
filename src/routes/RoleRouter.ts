import { Router } from "express"
import rController from "../controllers/RoleController"
import auth from "../middlewares/AuthMiddleware"

const router = Router()
/**
 * ************ CREATE ROLES **************
 */
router.route("/new").post(auth.adminRequired, rController.createRoles)
/**
 * ************** GET SINGLE ROLE BY ID *******************
 */
router.route("/single/:id").get(auth.adminRequired, rController.getRoleById)
/**
 * **************** GET EXISTING USER ROLES *********************
 */
router.route("/single/:id").get(auth.adminRequired, rController.getRoles)

export default router
