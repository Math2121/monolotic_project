import ProductFacade from "../facade/product.facade";
import ProductRepository from "../gateway/repository/product.repository";
import AddProductUseCase from "../usecase/add/product.usecase";
import CheckStockUseCase from "../usecase/check-stock/check-stock.usecase";

export default class ProductFacadeFactory {

    static create() {
        const productRepository = new ProductRepository()
        const productUseCase = new AddProductUseCase(productRepository)
        const checkStockUsecase = new CheckStockUseCase(productRepository)
        const productFacade = new ProductFacade({
            addUseCase: productUseCase,
            stockUseCase: checkStockUsecase
        })

        return productFacade
    }
}