import Id from "../../../@shared/domain/value_object/ide.value_object";
import Product from "../../domain/product.entity";
import ProductGateway from "../product.gateway";
import { ProductModel } from "./product.model";

export default class ProductRepository implements ProductGateway {
    async add(product: Product): Promise<void> {

        await ProductModel.create({
            name: product.name,
            description: product.description,
            salesPrice: product.purchasePrice,
            stock: product.stock,
            id: product.id.id.toString(),
        })
    }
    async find(id: string): Promise<Product> {
        const result = await ProductModel.findOne({
            where: {
                id: id,
            },
        })

        if (!result) {
            throw new Error(`Product with id ${id} not found`)
        }

        return new Product({
            id: new Id(result.get('id')),
            name: result.get('name'),
            description: result.get('description'),
            purchasePrice: result.get('salesPrice'),
            stock: result.get('stock'),
        })

    }

}