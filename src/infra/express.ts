import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { clientRoute } from "./api/client.route";
import { productRoute } from "./api/products.route";
import { checkoutRoute } from "./api/checkout.route";
import { invoiceRoute } from "./api/invoice.route";

import { ClientModel } from "../modules/client/gateway/repository/client.model";
import TransactionModel from "../modules/payment/gateaway/repository/transaction.model";
import ClientOrder from "../modules/checkout/repository/client.order.model";
import OrderModel from "../modules/checkout/repository/order.model";
import InvoiceModel from "../modules/invoice/gateway/repository/invoice.model";
import ProductOrder from "../modules/checkout/repository/product.order.model";
import InvoiceItemModel from "../modules/invoice/gateway/repository/invoice.item.model";

import { ProductModel } from "../modules/product/gateway/repository/product.model";
import StoreProductModel from "../modules/store/gateway/repository/product.model";
export const app: Express = express();
app.use(express.json());
app.use("/clients", clientRoute);
app.use('/products', productRoute);
app.use('/checkout', checkoutRoute)
app.use('/invoice', invoiceRoute)

export let sequelize: Sequelize;

async function setupDb() {
    sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
    });
    await sequelize.addModels([
        StoreProductModel,
        ProductModel,
        ClientModel,
        TransactionModel,
        OrderModel,
        InvoiceModel,
        ProductOrder,
        InvoiceItemModel
    ]);
    await sequelize.sync();
}
setupDb();