import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors())

app.get("/products", (req, res) => {
  res.json("Hey from products!")
});

app.listen(PORT, () => {
  console.log(`Product Service Running at: http://localhost:${PORT}/ 🚀`)
});