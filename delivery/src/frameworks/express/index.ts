import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "../../adapters/events/consumers/payment-success.consumer";
import delivery_router from "./delivery-routes";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());

app.use('/deliveries', delivery_router);

app.listen(PORT, () => console.log(`Delivery Service running on http://localhost:${PORT}`))