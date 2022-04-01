import todoDomain from "@root/domains/todo"
import { swaggerServe, SwaggerSetup } from "@root/utils/docs"
import { Request, Response, Router } from "express"

export default function () {
	const apiRoute = Router()
	todoDomain(apiRoute)
	apiRoute.get("/", (_req: Request, res: Response) => {
		return res.status(200).send({ api: "Working" })
	})
	apiRoute.use("/docs", swaggerServe, SwaggerSetup)
	return apiRoute
}
