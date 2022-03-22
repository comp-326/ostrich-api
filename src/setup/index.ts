import { Application } from "express"
import express from "express"
import expressWinston from "express-winston"
import cors from "cors"
import helmet from "helmet"
import { HTTPLogOptions, HTTPerrorLogOptions }from "./../logger"
import UserRouter from "../routes/UserRouter"
import AuthRouter from "./../routes/AuthRouter"
import RoleRouter from "./../routes/RoleRouter"
import FolderRouter from "./../routes/FolderRouter"
import ServicesRouter from "./../routes/ServiceRouter"
import AvailabilityRouter from "./../routes/AvailabilityRouter"
import WorkspaceRouter from "./../routes/WorkspaceRouter"
import  ExpressError from "./../ErrorHandler/ExpressError"
import path from "path"
import { BASE_DIR } from "../config"
/**
 *
 * @param {{app:express.Application}} param0
 */
export default ({ app }:{app:Application}) => {
	app.use(express.json({ limit: "100mb" }))
	app.use(cors({ origin: "*" }))
	app.use(helmet())
	app.use(express.urlencoded({ extended: true }))
	app.use(express.static(path.join(BASE_DIR,"public/uploads")))
	app.use(express.static(path.join(BASE_DIR,"public")))
	app.use(expressWinston.logger(HTTPLogOptions))
	app.use("/users", UserRouter)
	app.use("/roles", RoleRouter)
	app.use("/auth", AuthRouter)
	app.use("/workspaces", WorkspaceRouter)
	app.use("/folders", FolderRouter)
	app.use("/availability", AvailabilityRouter)
	app.use("/services", ServicesRouter)
	app.use(expressWinston.errorLogger(HTTPerrorLogOptions))
	app.use(ExpressError)
}
