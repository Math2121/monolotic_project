import Id from "../../../@shared/domain/value_object/ide.value_object"
import Product from "../../domain/product.entity"
import FindProductUseCase from "./find-product.usecase"

const product = new Product({
    id: new Id("1"),
    name: "Test Product",
    description: "This is a test product.",
    salesPrice: 10.99
})

const MockRepostiory = () => {
    return {
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(product)
    }
}
describe("Find product tests", () => {

    it("should return one product", async () => {
        const repository = MockRepostiory()
        const findProductUseCase = new FindProductUseCase(repository)

        const result = await findProductUseCase.execute({ id: "1" })

        expect(result.id).toBe("1")
    })

})