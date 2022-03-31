import { Router } from "express"
import aController from "../controllers/AppointmentController"
import auth from "../middlewares/AuthMiddleware"

const router = Router()

// Create user workspace
router.post("/create/new", auth.loginRequired, aController.createAppointment)
// Update Appointment
router.route("/appointment/update/:id").put(aController.updateAppoinment)
// Delete appointment
router.route("/appointment/delete/:id").delete(aController.deleteAppointment)
// Cancel appointment
router.route("/appointment/cancel/:id").put(aController.updateAppoinment)
// Reschedule appointment
router.route("/appointment/schedule/:id").put(aController.updateAppoinment)
// router.delete("/permissions/reset",service.resetRoles)

export default router
