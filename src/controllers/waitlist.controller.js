import Waitlist from "../models/Waitlist.js";


export const joinWaitlist = async(req,res) => {
    try {

        const {userId , restaurantId , date , startTime} = req.body;

        const wait = await Waitlist.create({
            restaurant:restaurantId,
            user:userId,
            date,
            startTime
        })

        return res.json({
            success:true,
            wait
        })
        
    } catch (error) {
        return res.json({
            success:false,
            message:error.message
        })
    }
}



