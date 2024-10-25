import express, { Request, Response } from "express";
import AddProductUseCase from "../../modules/product/usecase/add/product.usecase";
import ProductRepository from "../../modules/product/gateway/repository/product.repository";
import CheckStockUseCase from "../../modules/product/usecase/check-stock/check-stock.usecase";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
    const usecase = new AddProductUseCase(new ProductRepository());
    try {
        const productDto = {
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            purchasePrice: req.body.purchasePrice,
            stock: req.body.stock
        };
        const output = await usecase.execute(productDto);
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});

productRoute.get("/:productId", async (req: Request, res: Response) => {
    const usecase = new CheckStockUseCase(new ProductRepository());
    const output = await usecase.execute({ productID: req.params.productId });

    res.format({
        json: async () => res.send(output),
    });
});