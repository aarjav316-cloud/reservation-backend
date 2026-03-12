import mongoose from "mongoose";


const waitlistSchema = new  mongoose.Schema({

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
    date:{
        type:String,
        required:true
    },
    startTime:{
        type:String,
        required:true
    }

},{timestamps:true})

const Waitlist = mongoose.model("Waitlist" , waitlistSchema)

export default Waitlist


