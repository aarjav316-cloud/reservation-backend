import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    restaurant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Restaurant",
        required:true
    },
    table:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Table",
        required:true
    },
    date:{
        type:String,
        required:true
    },
    startTime:{
        type:String,
        requried:true
    },
    endTime:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["confirmed" , "pending" , "cancelled" , "completed"],
        default:"confirmed"
    }

}, {timestamps:true})



const Reservation = mongoose.model("Reservation" , reservationSchema)


export default Reservation;

















