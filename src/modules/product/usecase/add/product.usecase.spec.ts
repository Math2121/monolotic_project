import AddProductUseCase from "./product.usecase"

const mockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn(),
    }
}
describe("Add products", () => {
    it("should add products", async () => {
        const productRepository = mockRepository()
        const useCaseProduct = new AddProductUseCase(productRepository)

        const input = {
            id:'',
            name: "name",
            description: "PRoduct 1",
            purchasePrice: 100,
            stock: 20
        }

        const output = await useCaseProduct.execute(input)
        
        expect(output.id).toBeDefined()
        expect(output.name).toBe("name")
        expect(output.description).toBe("PRoduct 1")
        expect(output.purchasePrice).toBe(100)


    })
})