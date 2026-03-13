import jwt, { decode } from 'jsonwebtoken'

import User from '../models/User.js'

export const authMiddleware = async (req,res,next) => {
    try {

        const authHeader = req.headers.authorization;

        if(!authHeader){
            return res.json({
                success:false,
                message:"header not available"
            })
        }

        const token = authHeader.split(" ")[1]

        const decoded = token.verify(token , process.env.JWT_SECRET)


        const user = await User.find(decoded.id)

        if(!user){
            return res.json({
                success:true,
                message:"user not found invalid token"
            })
        }

        req.user = user

        next()
        
    } catch (error) {
        return res.json({
            success:false,
            message:error.message
        })
    }
}
