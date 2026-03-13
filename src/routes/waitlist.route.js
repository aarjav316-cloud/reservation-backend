import express from 'express'

import { joinWaitlist } from '../controllers/waitlist.controller.js'

import { authMiddleware } from '../middleware/auth.middleware.js'



const router = express.Router()


router.post('/' , authMiddleware,  joinWaitlist)

export default router;


