import Id from "../../../@shared/domain/value_object/ide.value_object";
import Product from "../../domain/product.entity";
import ProductGateway from "../../gateway/product.gateway";
import AddProductDto, { AddProductOutputDto } from "./product.dto";

export default class AddProductUseCase {
    private _productRepository: ProductGateway
    constructor(productRepository: ProductGateway) {
        this._productRepository = productRepository;
    }
    async execute(input: AddProductDto): Promise<AddProductOutputDto> {
        const props = {
            id: new Id(input.id),
            name: input.name,
            description: input.description,
            purchasePrice: input.purchasePrice,
            stock: input.stock
        }
        const product = new Product(props)

        await this._productRepository.add(product)
        return {
            id: product.id.id,
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock
        }

    }
}