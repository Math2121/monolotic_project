import StoreFacade from "../facade/store.facade";
import { StoreFacadeInterface } from "../facade/store.facade.interface";
import ProductRepository from "../gateway/repository/product.repository";
import FindAllProductUsecase from "../usecase/find-all/find-all.usecase";
import FindProductUseCase from "../usecase/find-product/find-product.usecase";

export default class StoreFacadeFactory {
    static create(): StoreFacadeInterface {

        const productRepository = new ProductRepository();
        const findUseCase = new FindProductUseCase(productRepository);

        const findAllUseCase = new FindAllProductUsecase(productRepository)
        const facade = new StoreFacade({
            findUseCase: findUseCase,
            findAllUseCase: findAllUseCase,
        })

        return facade
    }

}