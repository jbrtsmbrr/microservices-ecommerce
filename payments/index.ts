import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import "./adapters/events/order-created.consumer"

const app = express();

app.use(cors());
app.use(express.json());

app.listen(process.env.PORT, () => console.log(`[X] Payment Service Running on http://localhost:${process.env.PORT}`))