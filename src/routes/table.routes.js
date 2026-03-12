import { createTable ,
         getTables ,
         updateTableStatus ,
         deleteTable
        }  from "../controllers/table.controller.js";

import express from 'express'


const router = express.Router()

router.post('/' , createTable)
router.get("/:restaurantId" , getTables)
router.patch("/:id/status", updateTableStatus)
router.delete("/:id" , deleteTable)

export default router;
