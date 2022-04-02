import { Router } from "express"
import api from "./api"

const todoRouter = Router()
export default function authDomain(app: Router) {
	app.use("/auth", todoRouter)
	api.makeQueryLoginApiCall(todoRouter)
	api.makeQueryRegisterApiCall(todoRouter)
	return app
}
