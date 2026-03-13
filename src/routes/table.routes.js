import { createTable ,
         getTables ,
         updateTableStatus ,
         deleteTable
        }  from "../controllers/table.controller.js";

import express from 'express'

import { requiredRole } from "../middleware/role.middleware.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router()

router.post('/' ,
        authMiddleware,
        requiredRole("restaurant_admin"),
        createTable)


router.get("/:restaurantId" , getTables)


router.patch("/:id/status", 
        authMiddleware,
        requiredRole("restaurant_admin"),
        updateTableStatus)


router.delete("/:id" ,
        authMiddleware,
        requiredRole("restaurant_admin") ,
        deleteTable)

export default router;




