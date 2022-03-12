import { Router } from "express"
import {  ServiceService } from "./../services"
import JwtAuth from "./../auth/JwtAuth"
const router = Router()

const service = new ServiceService()
const auth = new JwtAuth()
// Create user service
router.route("/workspace/service/new").post(auth.adminRequired, service.func)
// Get service
router.route("/service/single/:id").post(auth.adminRequired, service.func)
// Update service
router.route("/service/update/:id").put(auth.adminRequired, service.func)
//Delete service
router.route("/service/delete/:id").delete(auth.adminRequired, service.func)


export default router
