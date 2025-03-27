import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import proxy from "express-http-proxy"

dotenv.config();

// Environment Variables
const PORT = process.env.PORT;

const app = express();

app.use(cors())
app.use(express.json());

console.log(process.env.PRODUCTS_URL)
app.get("/products", proxy(process.env.PRODUCTS_URL!));


app.listen(PORT, () => {
  console.log(`Main Service Running at: http://localhost:${PORT}/ 🚀`)
});