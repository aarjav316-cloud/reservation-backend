import mongoose from "mongoose";


const tableSchema = new mongoose.Schema({
    restaurant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Restaurant',
        required:true
    },
    tableNumber:{
        type:Number,
        required:true,
    },
    capacity:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:["available" , "maintainance"],
        default:"available",
    }
},{timestamps:true})


const Table = mongoose.model("Table" , tableSchema)

export default Table;




