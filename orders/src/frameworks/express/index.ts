import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import orders_router from "./routes/orders-route";
import trackingRouter from "./routes/trackings-route";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/orders", orders_router);
app.use("/trackings", trackingRouter);

app.listen(process.env.PORT, () => {
    console.log(`[/] Order Service Running at http://localhost:${process.env.PORT}`);
})
