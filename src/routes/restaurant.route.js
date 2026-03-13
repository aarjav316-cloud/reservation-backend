import express from 'express'

import {
     createRestaurant,
     getRestaurants,
     getRestaurantById
 } from '../controllers/restaurant.controller.js';

import { authMiddleware } from '../middleware/auth.middleware.js';
import { requiredRole } from '../middleware/role.middleware.js';

const router = express.Router();

router.use(authMiddleware)

router.post(
    "/"  , 
    authMiddleware ,
    requiredRole("restaurant_admin") ,
    createRestaurant
)


router.get("/" , getRestaurants)
router.get("/:id" , getRestaurantById)

export default router;



