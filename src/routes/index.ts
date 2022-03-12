import { AppPropType } from "../types/app"
import {
	AppointmentController,
	AuthController,
	AvailabilityController,
	FolderController,
	IntakeController,
	MessageController,
	RoleController,
	ServiceController,
	UserController,
	WorkspaceController,
} from "../controllers"
import html from "./../utils/html"

export default ({ app }: AppPropType): void => {
	app.get("/", (req, res) => {
		return res.send(html)
	})
	app.use("/api/v1/roles", RoleController)
	app.use("/api/v1/appointments", AppointmentController)
	app.use("/api/v1/availability", AvailabilityController)
	app.use("/api/v1/folders", FolderController)
	app.use("/api/v1/intakes", IntakeController)
	app.use("/api/v1/messages", MessageController)
	app.use("/api/v1/services", ServiceController)
	app.use("/api/v1/workspaces", WorkspaceController)
	app.use("/api/v1/auth", AuthController)
	app.use("/api/v1/users", UserController)
}
