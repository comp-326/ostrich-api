import { Router } from "express"
import aController from "./../controllers/AvailabilityController"
const router = Router()
import auth from "./../middlewares/AuthMiddleware"
// Create user availability
router.route("/availability/new").post( auth.loginRequired,aController.createAvailability)
// Update availability
// router.route("/availability/update/:id").put(auth.loginRequired, )
//Delete availability
router.route("/availability/delete/:id").delete(auth.loginRequired, aController.deleteAvailability)

export default router