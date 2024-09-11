import Id from "../../../@shared/domain/value_object/ide.value_object"
import Product from "../../domain/product.entity"
import CheckStockUseCase from "./check-stock.usecase"

const product = new Product({
    id: new Id("12"),
    name: "Test Product",
    description: "Test Product Description",
    purchasePrice: 10.99,
    stock: 10
})

const mockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product))
    }
}
describe("Check stock test", () => {

    it("should check stock", async () => {
        const productRepository = mockRepository()
        const checkStockUsecase = new CheckStockUseCase(productRepository)

        const input = {
            productId: product.id.id
        }

        const result = await checkStockUsecase.execute(input)
        expect(result).toBeDefined()
        expect(productRepository.find).toBeCalledWith(input.productId)
        expect(result.stock).toEqual(10)





    })

})