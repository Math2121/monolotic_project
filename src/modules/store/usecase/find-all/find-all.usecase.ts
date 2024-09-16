import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import Product from "../../domain/product.entity";
import ProductGateway from "../../gateway/product.gareway";

export default class FindAllProductUsecase implements UseCaseInterface {
    constructor(private productRepository: ProductGateway) { }
    async execute(): Promise<Product[]> {

        const products = await this.productRepository.findAll();

        return products;
    }
}
