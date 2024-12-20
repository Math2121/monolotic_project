
import Id from "../../@shared/domain/value_object/ide.value_object";
import { ClientModel } from "../../client/gateway/repository/client.model";
import Client from "../domain/client.entity";
import Order from "../domain/order.entity";
import CheckoutGateway from "../gateway/checkout.gateway";
import ClientOrder from "./client.order.model";
import OrderModel from "./order.model";
import ProductOrder from "./product.order.model";

export default class OrderRepository implements CheckoutGateway {

    async addOrder(order: Order): Promise<void> {

        const products = order.products.map((p) => {
            return {
                id: p.id.id,
                name: p.name,
                salesPrice: p.salesPrice,
            }
        })
        try {
            await OrderModel.create({
                id: order.id.id,
                clientId: order.client.id.id,
                client: {
                    id: order.client.id.id,
                    name: order.client.name,
                    email: order.client.email,
                    street: order.client.street,
                    number: order.client.number,
                    city: order.client.city,
                    zipCode: order.client.zipCode,
                    state: order.client.state,
                    complement: order.client.complement,
                    document: order.client.document
                },
                products: products
            });
        } catch (error) {
            console.log(error);
            throw error
        }

    }

    async findOrder(id: string): Promise<Order> {
        const result = await OrderModel.findOne(
            { where: { id: id }, include: ['client', 'products'] });
        const orderBD = result.dataValues
        const clientBD = orderBD.client.dataValues;
        const productsBD = orderBD.products
        const productsRes = productsBD.map((p: { id: string; name: any; salesPrice: any; }) => {
            return {
                id: new Id(p.id),
                name: p.name,
                salesPrice: p.salesPrice
            }
        })
        const client = new Client({
            id: new Id(clientBD.id),
            name: clientBD.name,
            email: clientBD.email,
            street: clientBD.street,
            number: clientBD.number,
            city: clientBD.city,
            zipCode: clientBD.zipCode,
            state: clientBD.state,
            document: clientBD.documentation,
            complement: clientBD.complement
        })
        return new Order({
            id: new Id(orderBD.id),
            client: client,
            products: productsRes
        })
    }

}