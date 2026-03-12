import mongoose from "mongoose";


const restaurantSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    cuisine:{
        type:String,
        required:true
    },
    openingTime:{
        type:String,
        required:true
    },
    closingTime:{
        type:String,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},
  {timestamps:true}
)

const Restaurant = mongoose.model('Restaurant' , restaurantSchema)


export default Restaurant;


