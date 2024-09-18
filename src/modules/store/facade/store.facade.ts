import ProductGateway from "../gateway/product.gareway";
import FindAllProductUsecase from "../usecase/find-all/find-all.usecase";
import FindProductUseCase from "../usecase/find-product/find-product.usecase";
import { FIndAllStoreFacadeOutputDto, FIndStoreFacadeInputDto, FIndStoreFacadeOutputDto, StoreFacadeInterface } from "./store.facade.interface";
export interface UseCaseProps {
    findUseCase: FindProductUseCase,
    findAllUseCase: FindAllProductUsecase
}
export default class StoreFacade implements StoreFacadeInterface {
    private readonly _findUseCase: FindProductUseCase;
    private readonly _findAll: FindAllProductUsecase;
    constructor(props: UseCaseProps) {
        this._findUseCase = props.findUseCase;
        this._findAll = props.findAllUseCase;
    }


    async find(id: FIndStoreFacadeInputDto): Promise<FIndStoreFacadeOutputDto> {

        return await this._findUseCase.execute(id);

    }
    async findAll(): Promise<FIndAllStoreFacadeOutputDto> {
        return {
            products: await this._findAll.execute()
        }
    }

}