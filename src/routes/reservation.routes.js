import express from 'express'
import { createReservation,
         getUserReservation,
         cancelReservation
 } from '../controllers/reservation.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'



 const router = express.Router()


 router.use(authMiddleware)


 router.post("/" , authMiddleware, createReservation)
 router.get("/user/:userId" , authMiddleware  ,getUserReservation)
 router.patch("/:id/cancel"  , cancelReservation)


 export default router;



 

