import Reservation from "../models/Reservation.js";
import Table from "../models/Table.js";
import redisClient from "../config/redis.js";


export const createReservation = async (req,res) => {
    try {

        const {userId , tableId , restaurantId , date , startTime , endTime} = req.body;

        if(!userId || !tableId || !restaurantId || !date || !startTime ||  !endTime){
            return res.json({
                success:false,
                message:"insufficient credentials"
            })
        }

        const table = await Table.findById(tableId)

        if(!table){
            return res.json({
                success:false,
                message:"table not found"
            })
        }

        const lockKey = `lock:table:${tableId}:${date}:${startTime}`

        const lock = await redisClient.set(
            lockKey,
            userId,
            {
                NX:true,
                EX:300
            }
        )

        if(lock == null ){
            return res.status(400).json({
                success:false,
                message:"table is currently being reserved"
            })
        }

        const conflict = await Reservation.findOne({
            table:tableId,
            date,
            status:"confirmed",

            startTime:{$lt:endTime},
            endTime:{$gt:startTime}
        })

        if(conflict){
            return res.json({
                success:false,
                message:"table already reserved for this time slot"
            })
        }

        const reservation = await Reservation.create({
            user:userId,
            table:tableId,
            restaurant:restaurantId,
            date,
            startTime,
            endTime,
            status:"confirmed"
        })


        return res.json({
            success:true,
            message:"reservation created",
            data:reservation
        })
        
    } catch (error) {
        return res.json({
            success:false,
            message:error.message
        })
    }
}




export const getUserReservation = async(req,res)=> {
    try {

        const {userId} = req.params;

        const reservations = await Reservation.find({
            user:userId
        })
        .populate("restaurant" , "name location")
        .populate("table" , "tableNumber capacity")


        return res.json({
            success:true,
            reservations
        })

        
        
    } catch (error) {
        return res.json({
            success:false,
            message:error.message
        })
    }
}



export const cancelReservation = async(req,res) => {
    try {

        const {id} = req.params;

        const reservation = await Reservation.findByIdAndUpdate(
            id,
            {status:"cancelled"},
            {new:true}
        )

        return res.json({
            success:true,
            message:"reservation updated successfully",
            reservation
        })
        
    } catch (error) {
        return res.json({
            success:false,
            message:error.message
        })
    }
}



