import { Router } from "express"
import { AppointmentService } from "./../services"
import JwtAuth from "./../auth/JwtAuth"
const router = Router()

const service = new AppointmentService()
const auth = new JwtAuth()
// Create user workspace
router.post("/create/new", auth.creatorRequired, service.createAppointment)
// Update Appointment
router.route("/appointment/update/:id").put(service.updateAppoinment)
// Delete appointment
router.route("/appointment/delete/:id").delete(service.deleteAppointment)
// Cancel appointment
router.route("/appointment/cancel/:id").put(service.updateAppoinment)
// Reschedule appointment
router.route("/appointment/schedule/:id").put(service.updateAppoinment)
// router.delete("/permissions/reset",service.resetRoles)

export default router
