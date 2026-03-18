import User from "../models/User.js";
import bcrypt from "bcrypt"
import generateToken from "../utils/generateToken.js";

export const registerUser = async(req,res) => {
    try {

        const { name , password , email , role } =  req.body;

        if(!email || !name || !password || !role){
            return res.json({
                success:false,
                message:"insufficient creds"
            })
        }

        const existingUser =  await User.findOne({email})

        if(existingUser){
            return res.json({
                success:false,
                message:"User already exists"
            })
        }

        const hashedPass = await bcrypt.hash(password , 10)   

        const user = await User.create({
            name,
            email,
            role,
            password:hashedPass
        })

        return res.json({
            success:true,
            message:"user created successfully"
        })
        
    } catch (error) {
        return res.json({
            success:false,
            message:error.message
        })
    }
}



export const loginUser = async(req,res) => {
    try {

        const {email  , password} = req.body;

        if(!email || !password){
            return res.json({
                success:false,
                message:"insuffient credentials"
            })
        }
        
        const user = await User.findOne({email})

        if(!user){
            return res.json({
                success:false,
                message:"User does not exists"
            })
        }

        const  isMatch = await bcrypt.compare(password , user.password)

        if(!isMatch){
            return res.json({
                success:false,
                message:"incorrect password"
            })
        }

        return res.json({
            success:true,
            message:"user logged in successfully",
            token:generateToken(user._id)
        })
        
    } catch (error) {
        return res.json({
            success:false,
            message:error.message
        })
    }
}




