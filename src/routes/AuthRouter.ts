import { Router } from "express"
import  aController from "../controllers/AuthController"
import uMiddleware from "../middlewares/UserMiddleware"
import  {imageUpload} from "../serverUpload"

const router = Router()
/**
 * *********** CREATE NEW ACCOUNT **********
 */
router
	.route("/register")
	.post(
		imageUpload.single("profile"),
		uMiddleware.validateRegistrationData,
		aController.createAccount,
		uMiddleware.uploadProfilePic,
	)
/**
 * *********** LOGIN USER ***************
 */
router.route("/login").post(aController.login)

export default router
