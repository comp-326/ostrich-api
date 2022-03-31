import { Router } from "express"
import sController from "../controllers/ServiceController"
import auth from "../middlewares/AuthMiddleware"

const router = Router()

// Create user service
router.route("/workspace/service/:workspaceId/new").post(auth.loginRequired, sController.createService)
// Get service
router.route("/service/single/:id").get(auth.loginRequired, sController.getService)
// Get services
router.route("/").get(auth.loginRequired, sController.getServices)
// Update service
router.route("/service/update/:id").put(auth.loginRequired, sController.updateService)
//Delete service
router.route("/service/delete/:workspaceId/:id").delete(auth.loginRequired, sController.deleteService)


export default router