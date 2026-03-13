export const requiredRole = (role) => {
    return (req,res,next) => {
        if(req.user.role != role){
            return res.json({
                success:false,
                message:"incorrect role for this work"
            })
        }

        next()
    }
}

