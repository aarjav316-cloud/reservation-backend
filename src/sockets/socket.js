import { Server } from "socket.io";

let io;

export const initSocket = (server) => {

    io = new Server(server , {
        cors:{
            origin: "*"
        }
    })

    io.on("connection" , (socket) =>{
        console.log("Client connected: " , socket.id)

        socket.on("disconnect" , () => {
            console.log("client disconnected" , socket.id)
        })
    } )

}


export const getIo = () => {
    if(!io) {
        throw new Error("socket.io not initialized")
    }

    return io;
}





















