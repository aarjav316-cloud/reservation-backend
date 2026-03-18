import Reservation from "../models/Reservation.js";
import Table from "../models/Table.js";
import redisClient from "../config/redis.js";
import Waitlist from "../models/Waitlist.js";
import { getIo } from "../sockets/socket.js";



export const createReservation = async (req,res) => {

 try {

  const { restaurantId, guests, date, startTime, endTime } = req.body

  const userId = req.user._id

  if(!restaurantId || !guests || !date || !startTime || !endTime){
   return res.status(400).json({
    success:false,
    message:"missing required fields"
   })
  }

  //  find all tables for restaurant
  const tables = await Table.find({
   restaurant:restaurantId,
   status:"available"
  })

  if(!tables.length){
   return res.status(404).json({
    success:false,
    message:"no tables found"
   })
  }

  //  filter tables with enough capacity
  const suitableTables = tables.filter(
   table => table.capacity >= guests
  )

  if(!suitableTables.length){
   return res.status(400).json({
    success:false,
    message:"no table available for this group size"
   })
  }

  //  sort tables by capacity
  suitableTables.sort((a,b)=>a.capacity-b.capacity)

  let selectedTable = null

  //  check time conflicts
  for(const table of suitableTables){

   const conflict = await Reservation.findOne({
    table:table._id,
    date,
    status:"confirmed",
    startTime:{ $lt:endTime },
    endTime:{ $gt:startTime }
   })

   if(!conflict){
    selectedTable = table
    break
   }

  }

  if(!selectedTable){
   return res.status(400).json({
    success:false,
    message:"no tables available for this time"
   })
  }

  // 5️⃣ create reservation
  const reservation = await Reservation.create({
   user:userId,
   restaurant:restaurantId,
   table:selectedTable._id,
   date,
   startTime,
   endTime,
   status:"confirmed"
  })

  const io = getIo()

  io.emit("reservation created" , {
    restaurantId,
    table:  selectedTable._id,
    date,
    startTime
  })

  return res.status(201).json({
   success:true,
   reservation
  })

 } catch(error){

  return res.status(500).json({
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

        const reservation = await Reservation.findById(id)   

        if(!reservation){
            return res.json({
                success:false,
                message:"reservation not found"
            })
        }

        reservation.status ="cancelled";

        await reservation.save()

        const io = getIO()

         io.to(`restaurant_${reservation.restaurant}`).emit("table_freed", {
           tableId: reservation.table,
           restaurantId: reservation.restaurant
         })

         const waitListUser = await Waitlist.findOne({
            restaurant: reservation.restaurant,
            date: reservation.date,
            startTime: reservation.startTime
          }).sort({ createdAt: 1 })
          
          if (waitListUser) {
          
            const newReservation = await Reservation.create({
              user: waitListUser.user,
              restaurant: reservation.restaurant,
              table: reservation.table,
              date: reservation.date,
              startTime: reservation.startTime,
              endTime: reservation.endTime,
              status: "confirmed"
            })

            const io = getIO()

             io.to(`user_${waitListUser.user}`).emit("waitlist_notified", {
               userId: waitListUser.user,
               restaurantId: reservation.restaurant,
               tableId: reservation.table
             })
          
            await waitListUser.deleteOne()
          
          }

         await waitListUser.deleteOne()

        return res.json({
            success:true,
            message:"reservation cancelled",
            
        })
        
    } catch (error) {
        return res.json({
            success:false,
            message:error.message
        })
    }
}



