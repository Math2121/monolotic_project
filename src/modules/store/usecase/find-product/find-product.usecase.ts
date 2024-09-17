import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import ProductGateway from "../../gateway/product.gareway";
import { FindProductInputDto, FindProductOutputDto } from "./find-product.dto";

export default class FindProductUseCase implements UseCaseInterface {
    constructor(private readonly productRepository: ProductGateway) { }
    async execute(input: FindProductInputDto): Promise<FindProductOutputDto> {


        const product = await this.productRepository.find(input.id);
        if (!product) {
            throw new Error(`Product not found with id: ${input.id}`);
        }
        const output: FindProductOutputDto = {
            id: product.id.id,
            name: product.name,
            description: product.description,
            salePrice: product.salesPrice
        };

        return output;

    }
}