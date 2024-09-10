import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import ProductFacadeInterface, { AddProductFacadeDtoInterface, CheckProductFacadeDtoInterface, CheckProductOutputFacadeDtoInterface } from "./product.facade.interface";
export interface UseCaseProps {
    addUseCase: UseCaseInterface
    stockUseCase: UseCaseInterface
}
export default class ProductFacade implements ProductFacadeInterface {
    private _addUseCase: UseCaseInterface
    private _checkStockUseCase: UseCaseInterface;

    constructor(usecasesProps: UseCaseProps) {
        this._addUseCase = usecasesProps.addUseCase
        this._checkStockUseCase = usecasesProps.stockUseCase
    }

    async addProduct(input: AddProductFacadeDtoInterface): Promise<void> {
        return await this._addUseCase.execute(input)
    }
    async checkStock(input: CheckProductFacadeDtoInterface): Promise<CheckProductOutputFacadeDtoInterface> {
        return await this._checkStockUseCase.execute(input)
    }

}