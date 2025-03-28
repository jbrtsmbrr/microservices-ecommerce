import dotenv from "dotenv";
dotenv.config();

import init from "./frameworks/express"

const PORT = process.env.PORT!;

init(PORT);