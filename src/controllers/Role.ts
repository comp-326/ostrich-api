import { Router } from "express"
import { RoleService } from "./../services"
import JwtAuth from "./../auth/JwtAuth"
const router = Router()

const service = new RoleService()
const auth = new JwtAuth()
router.post("/create",auth.adminRequired,service.insertRoles)
router.get("/all", service.allRoles)
// router.delete("/permissions/reset",service.resetRoles)

export default router
