import Restaurant from "../models/Restaurant.js";
import User from "../models/User.js";


export const createRestaurant = async (req,res) => {
    try {

        const {name , location , openingTime , closingTime , cuisine} = req.body;

        const {owner} = req.user._id;

        if(!name || !location || !openingTime || !closingTime || !cuisine || !owner){
            return res.json({
                success:false,
                message:"please provide complete details...."
            })
        }

        const restaurant = await Restaurant.create({
            name,
            location,
            openingTime,
            closingTime,
            cuisine,
            owner
        })

        return res.json({
            success:true,
            message:"restaurant created successfully",
            data:restaurant
        })
        
    } catch (error) {
        return res.json({
            success:false,
            message:error.message
        })
    }
}


export const getRestaurants = async (req,res) => {
    try {

        const restaurants = await Restaurant.find().populate("owner" , "name email")

        if(!restaurants){
            return res.json({
                success:false,
                message:"restaurant not found"
            })
        }

        return res.json({
            success:true,
            restaurants
        })
        
    } catch (error) {
        return res.json({
            success:false,
            message:error.message
        })
    }
}


export const getRestaurantById = async (req,res) => {
    try {

        const {id} = req.params;

        if(!id){
            return res.json({
                success:false,
                message:"invalid credentials"
            })
        }

        const restaurant = await Restaurant.findById(id).populate("owner" , "name email")

        if(!restaurant){
            return res.json({
                success:false,
                message:"restaurant not found"
            })
        }

        return res.json({
            success:true,
            restaurant
        })
        
    } catch (error) {
        return res.json({
            success:false,
            message:error.message
        })
    }
}












