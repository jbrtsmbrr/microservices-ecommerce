import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./adapters/events/order-created.consumer"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.listen(process.env.PORT, () => console.log(`[X] Payment Service Running on http://localhost:${process.env.PORT}`))