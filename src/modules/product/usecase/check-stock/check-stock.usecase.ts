import ProductGateway from "../../gateway/product.gateway";
import ProductRepository from "../../gateway/repository/product.repository";
import InputCheckStockDto, { CheckStockOutputDto } from "./check-stock.dto";

export default class CheckStockUseCase {
    private _productRepository: ProductGateway

    constructor(productRepository: ProductGateway) {
        this._productRepository = productRepository;
    }

    async execute(input: InputCheckStockDto): Promise<CheckStockOutputDto> {

        const product = await this._productRepository.find(input.productID);
        if (!product) {
            throw new Error(`Product with id ${input.productID} not found.`);
        }
        if (product.stock <= 0) {
            throw new Error(`Product with id ${input.productID} is out of stock.`);
        }

        return {
            productID: product.id.id,
            stock: product.stock,

        };

    }
}