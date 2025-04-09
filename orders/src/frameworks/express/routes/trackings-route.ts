import { Router } from "express";
import { track_order_controller } from "../../../adapters/controllers";

const trackingRouter = Router();

trackingRouter.get("/", async (req, res) => {
    await track_order_controller.handle(req, res);
})

export default trackingRouter;