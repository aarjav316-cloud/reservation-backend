import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import http from 'http'

import connectDb from './config/db.js'
import redisClient from './config/redis.js'
import { initSocket } from './sockets/socket.js'

import authRoutes from './routes/auth.routes.js'
import restaurantRoutes from './routes/restaurant.route.js'
import tableRoutes from './routes/table.routes.js'
import reservationRoutes from './routes/reservation.routes.js'



dotenv.config()


const app = express()

const server = http.createServer(app)

initSocket(server)

app.use(express.json())
app.use(cors())
app.use(morgan("dev"))


app.use('/api/auth' , authRoutes)
app.use('/api/restaurants' , restaurantRoutes)
app.use('/api/tables' , tableRoutes)
app.use('/api/reservations' , reservationRoutes)


app.get("/" , (req,res)=> {
    res.send("restaurant reservation API running")
})


const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {

        await connectDb()

        await redisClient.connect()

        server.listen(PORT , () => {
            console.log(`server running on port ${PORT}`)
        })
        
    } catch (error) {
        console.error("server setup failed" , error)
    }
}

startServer()



