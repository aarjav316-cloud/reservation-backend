import Table from "../models/Table.js";
import Restaurant from "../models/Restaurant.js";

export const createTable = async(req,res) => {
    try {

        const  {restaurantId , tableNumber , capacity }  = req.body;

        if(!restaurantId || !tableNumber || !capacity){
            return res.json({
                success:false,
                message:"please provide compelete details",
            })
        }

        const table = await Table.create({
            restaurant:restaurantId,
            tableNumber,
            capacity
        })

        return res.json({
            success:true,
            message:"table created successfully",
            data:table
        })
        
    } catch (error) {
        return res.json({
            success:false,
            message:error.message
        })
    }
}



export const getTables = async (req,res) => {
    try {

        const {restaurantId} = req.params;

       
         const  tables = await Table.find({
            restaurant:restaurantId
         })

        return res.json({
            success:true,
            data:tables
        })
        
    } catch (error) {
        return res.json({
            success:false,
            message:error.message
        })
    }
}


export const updateTableStatus = async (req,res) => {
    try {

        const {id} = req.params;
        const {status} = req.body;

        if(!status){
            return res.json({
                success:false,
                message:"insufficient credentials"
            })
        }

        const updated = await Table.findByIdAndUpdate(
            id,
            {status},
            {new:true}
        )

        return res.json({
            success:true,
            data:updated
        })
         
    } catch (error) {
        return res.json({
            success:false,
            message:error.message
        })
    }
}




export const deleteTable = async (req,res) => {
    try {

        const {id} = req.params;

        await Table.findByIdAndDelete(id)

        return res.json({
            success:true,
            message:"table deleted"     
        })
        
    } catch (error) {
        return res.json({
            success:false,
            message:error.message
        })
    }
}











