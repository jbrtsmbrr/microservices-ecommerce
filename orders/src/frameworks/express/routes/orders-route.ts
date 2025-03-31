import { Router } from "express";
import { create_order_controller } from "../../../adapters/controllers";

const orders_router = Router();

// Add order
orders_router.post("/", async (req, res) => {
    await create_order_controller.handle(req, res);
});

export default orders_router;