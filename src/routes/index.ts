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
	app.use("/roles", RoleController)
	app.use("/appointment", AppointmentController)
	app.use("/availability", AvailabilityController)
	app.use("/folder", FolderController)
	app.use("/intake", IntakeController)
	app.use("/message", MessageController)
	app.use("/services", ServiceController)
	app.use("/workspace", WorkspaceController)
	app.use("/auth", AuthController)
	app.use("/users", UserController)
}
