import { Router } from "express"
import { pickup_controller, ongoing_delivery_controller, order_delivered_controller } from "../../adapters/controllers";

const delivery_router = Router();

delivery_router.put('/pickup-orders', async (req, res) => {
  pickup_controller.handle(req, res)
})

delivery_router.put('/deliver-orders', async (req, res) => {
  ongoing_delivery_controller.handle(req, res)
})

delivery_router.put('/order-delivered', async (req, res) => {
  order_delivered_controller.handle(req, res)
})

export default delivery_router;