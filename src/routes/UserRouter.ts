import { Router } from "express"
import { EMAIL_ACCOUNT } from "../config"
import uController from "../controllers/UserController"
import ErrorResponse from "../ErrorHandler/ErrorResponse"
import { mailTransport } from "../mail"
import auth from "../middlewares/AuthMiddleware"
import uMiddleware from "../middlewares/UserMiddleware"
import { imageUpload } from "../serverUpload"
const router = Router()
/**
 * Send email test
 */
router.post("/mail", async (req, res, next) => {
	try {
		let sent = false
		if (!req.body.email) {
			return next(new ErrorResponse("Provide email", 400))
		}
		try {
			const res = await mailTransport.sendMail({
				to: req.body.email,
				subject: "Test",
				from: EMAIL_ACCOUNT,
			})
			console.log(res)
			res && (sent = true)
		} catch (err) {
			err && (sent = false)
		}
		return res
			.status(200)
			.json({ message: sent ? "Email sent" : "Email not sent" })
	} catch (err:any) {
		return next(new ErrorResponse(err.message,500))
	}
})
/**
 * ************* UPDATE USER PROFILE ********
 */
router
	.route("/update/profile/:id")
	.put(
		auth.loginRequired,
		imageUpload.single("profile"),
		uController.updateUserDetails,
		uMiddleware.uploadProfilePic,
	)
/**
 * *************    GET USERS   *********************
 */
router.route("/").get(uController.getUsers)
/**
 * **************  GET USER BY ID *******************
 */
router.route("/single/:id").get(uController.getUserById)
/**
 * *************** ACTIVATE USER ACCOUNT **********
 */
router
	.route("/account/activate/:token")
	.put(uMiddleware.verifyLinkToken, uController.activateAccount)

/**
 * *************** FORGOT PASSWORD ********************
 */
router.route("/account/forgot/password").post(uController.forgotPassword)
/**
 * ************    RESET PASSWORD **********
 */
router.route("/account/password/reset/:token").post(uController.resetPassword)
export default router
