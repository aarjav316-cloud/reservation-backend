import express from 'express'

import {
     createRestaurant,
     getRestaurants,
     getRestaurantById
 } from '../controllers/restaurant.controller.js'

const router = express.Router();

router.post("/" , createRestaurant)
router.get("/" , getRestaurants)
router.get("/:id" , getRestaurantById)

export default router;



