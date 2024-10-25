import Product from "../../domain/product.entity";
import ProductGateway from "../product.gareway";
import StoreProductModel from "./product.model";


export default class ProductRepository implements ProductGateway {
    async findAll(): Promise<Product[]> {

        const products = await StoreProductModel.findAll();

        return products.map(product => new Product(product.dataValues));


    }
    async find(id: string): Promise<Product> {
        const product = await StoreProductModel.findByPk(id);
        if (!product) throw new Error('Product not found');
        return new Product(product.dataValues);
    }

}