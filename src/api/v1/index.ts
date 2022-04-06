import workspaceDomain from "@domains/Workspace"
import authDomain from "@domains/Auth"
import userDomain from "@domains/Users"
import { swaggerServe, SwaggerSetup } from "@root/utils/docs"
import { Request, Response, Router } from "express"

export default function () {
	const apiRoute = Router()
	userDomain(apiRoute)
	authDomain(apiRoute)
	workspaceDomain(apiRoute)
	apiRoute.get("/", (_req: Request, res: Response) => {
		return res.status(200).send({ api: "Working" })
	})
	apiRoute.use("/docs", swaggerServe, SwaggerSetup)
	return apiRoute
}
