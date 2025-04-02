import { Router } from "express";
import { all_products_controller, create_product_controller } from "../../../adapters/controllers";

const product_router = Router();

// Create
product_router.post('/', async function (req, res) {
    await create_product_controller.handle(req, res)
});

// Update
product_router.put('/:id', async function (_, res) {
    res.send('Product Updated!');
});

// Find all
product_router.get('/', async function (req, res) {
    await all_products_controller.handle(req, res);
});

// Find One
product_router.get('/:id', async function (_, res) {
    res.send('Product Selected!');
});


// Delete
product_router.delete('/:id', async function (_, res) {
    res.send('Product Deleted!');
});

export default product_router;