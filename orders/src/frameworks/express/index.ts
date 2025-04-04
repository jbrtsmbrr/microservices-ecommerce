import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import orders_router from "./routes/orders-route";
import http from "http";
import { Server } from "socket.io";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "*"
}));

// Routes
app.use("/orders", orders_router);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        credentials: true,
        origin: "*",
        methods: ["GET"]
    }
});

io.sockets.on("connection", (socket) => {
    console.log("Client connected:", socket.id);
    
    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});

server.listen(process.env.PORT, () => {
    console.log(`[/] Order Service Running at http://localhost:${process.env.PORT}`);
})

// export default function startOrderService() {
//     server.listen(process.env.PORT, () => {
//         console.log(`[/] Order Service Running at http://localhost:${process.env.PORT}`);
//     })
// }