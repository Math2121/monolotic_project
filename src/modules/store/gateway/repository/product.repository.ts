import Product from "../../domain/product.entity";
import ProductGateway from "../product.gareway";
import ProductModel from "./product.model";

export default class ProductRepository implements ProductGateway {
    async findAll(): Promise<Product[]> {

        const products = await ProductModel.findAll();

        return products.map(product => new Product(product.dataValues));


    }
    find(id: string): Promise<Product> {
        throw new Error("Method not implemented.");
    }

}