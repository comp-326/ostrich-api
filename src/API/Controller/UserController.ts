import { createAvailability, deleteAvailability } from "./../Services/User.service"
import { Router } from "express"
import { Authorize } from "../Middlewares/AuthJwt"
import {
	cancelAppointment,
	createAppointment,
	rescheduleAppointment,
	updateAppointment,
} from "../Services/Appointment.service"
import { updateUserProfile, userProfile } from "../Services/User.service"

const router = Router()

router.post("/appointment/create/new", Authorize, createAppointment)
router.put("/appointment/cancel/:appointmentId", Authorize, cancelAppointment)
router.put(
	"/appointment/reschedule/:appointmentId",
	Authorize,
	rescheduleAppointment,
)
router.put("/appointment/update/:appointmentId", Authorize, updateAppointment)
router.get("/profile/:userId", Authorize, userProfile)
router.put("/profile/:userId/update", Authorize, updateUserProfile)
// new availability
router.post("/profile/availability/new", Authorize, createAvailability)
router.delete("/profile/availability/delete/:availabilityId", Authorize, deleteAvailability)

export default router
