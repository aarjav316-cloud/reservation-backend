import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    role:{
        type:String,
        enum:["customer" , "restaurant_admin"],
        default:"customer",
        required:true
    } 
},
{timestamps:true}
)


const User = mongoose.model('User' , userSchema)

export default User;
