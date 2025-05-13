import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import amqplib from "amqplib"
import product_router from "./src/frameworks/express/routes/product-routes";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.ENV_MODE === "production" ? process.env.GATEWAY_URL : "*"
}))

app.use("/", product_router);

app.listen(PORT, () => {
  console.log(`Product Service Running at: http://localhost:${PORT}/ 🚀`)
});