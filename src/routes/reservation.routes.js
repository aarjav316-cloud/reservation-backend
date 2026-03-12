import express from 'express'
import { createReservation,
         getUserReservation,
         cancelReservation
 } from '../controllers/reservation.controller.js'



 const router = express.Router()


 router.post("/" , createReservation)
 router.get("/user/:userId" , getUserReservation)
 router.patch("/:id/cancel"  , cancelReservation)


 export default router;



 

