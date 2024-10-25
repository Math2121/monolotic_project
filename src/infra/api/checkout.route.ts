import express, { Request, Response } from "express";
import CheckoutFacadeFactory from "../../modules/checkout/factory/checkout.facade.factory";

export const checkoutRoute = express.Router();

checkoutRoute.post("/", async (req: Request, res: Response) => {
    try {
        const usecase = CheckoutFacadeFactory.create();
        const checkoutDto = {
            clientId: req.body.clientId,
            products: req.body.products
                .map((p: { productId: string; }) => { return { productID: p.productId } })
        };

        const output = await usecase.execute(checkoutDto);
        res.send(output);
    } catch (err) {
        console.error(err);
        res.status(500)
        .send(err);
    }
});
