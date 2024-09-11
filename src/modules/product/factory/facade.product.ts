import ProductFacade from "../facade/product.facade";
import ProductRepository from "../gateway/repository/product.repository";
import AddProductUseCase from "../usecase/add/product.usecase";

export default class ProductFacadeFactory {

    static create() {
        const productRepository = new ProductRepository()
        const productUseCase = new AddProductUseCase(productRepository)
        const productFacade = new ProductFacade({
            addUseCase: productUseCase,
            stockUseCase: undefined
        })

        return productFacade
    }
}