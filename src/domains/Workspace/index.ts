import { Router } from "express"
import api from "./api"

const workspaceRouter = Router()
export default function workspaceDomain(app: Router) {
	app.use("/workspaces", workspaceRouter)
	api.makeQueryAllWorkspaceApiCall(workspaceRouter)
	api.makeQueryNewWorkspaceApiCall(workspaceRouter)
	api.makeQueryUpdateLogoWorkspaceApiCall(workspaceRouter)
	api.makeQueryUpdateWorkspaceApiCall(workspaceRouter)
	api.makeQueryUserWorkspaceApiCall(workspaceRouter)
	return app
}