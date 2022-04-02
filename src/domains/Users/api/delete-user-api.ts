import { Router } from "express"
import MakeRequestAdapter from "../adapters"
import { deleteUser } from "../controllers"

const qRouter = Router()
export async function makeDeleteUserApiCall(app: Router) {
	app.use("/delete", qRouter)
	qRouter.delete("/:id", MakeRequestAdapter(deleteUser))
}
