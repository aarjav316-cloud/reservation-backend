import Waitlist from "../models/Waitlist.js";


export const joinWaitlist = async(req,res) => {
    try {

        const { guests , restaurantId , date , startTime , endTime } = req.body;

        const userId  = req.user._id

        const wait = await Waitlist.create({
            user:userId,
            restaurant:restaurantId,
            guests,
            
            date,
            startTime,
            endTime
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



