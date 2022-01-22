import { Router } from "express"
import {
	cancelAppointment,
	createAppointment,
	rescheduleAppointment,
	updateAppointment,
} from "../controllers/Appointment.controller"
import { updateUserProfile, userProfile } from "../controllers/User.controller"

const router = Router()

router.post("/appointment/create/new", createAppointment)
router.put("/appointment/cancel/:appointmentId", cancelAppointment)
router.put("/appointment/reschedule/:appointmentId", rescheduleAppointment)
router.put("/appointment/update/:appointmentId", updateAppointment)
router.get("/profile/:userId", userProfile)
router.put("/profile/:userId/update", updateUserProfile)

export default router
