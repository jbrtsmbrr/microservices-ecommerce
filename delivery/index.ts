import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./src/adapters/events/consumers/payment-success.consumer"

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());

app.listen(PORT, () => console.log(`Delivery Service running on http://localhost:${PORT}`))