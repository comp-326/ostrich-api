import { Router } from 'express'
import { createInstitution } from '../controllers/Institution.controller'
import { verifyAuthToken } from '../middlewares/AuthJwt'

const router = Router()
router.post('/new', verifyAuthToken, createInstitution)

export default router
