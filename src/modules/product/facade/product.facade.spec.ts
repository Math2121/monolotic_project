import { Sequelize } from "sequelize-typescript"
import { ProductModel } from "../gateway/repository/product.model"
import ProductRepository from "../gateway/repository/product.repository"
import AddProductUseCase from "../usecase/add/product.usecase"
import ProductFacade from "./product.facade"

describe("Product Facade", () => {
    let sequelize: Sequelize

    beforeAll(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        })

        await sequelize.addModels([ProductModel])
        await sequelize.sync()
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it("should create a new Product", async () => {
        const productRepository = new ProductRepository()
        const addProductUSeCase = new AddProductUseCase(productRepository)

        const productFacade = new ProductFacade(
            {
                addUseCase: addProductUSeCase,
                stockUseCase: undefined,
            }
        )
        const input = {
            id: "1",
            name: "Test Product",
            purchasePrice: 100,
            stock: 10,
            description: "teste"
        }
        await productFacade.addProduct(input)

        const product = await ProductModel.findOne({ where: { id: "1" } })
        expect(product).toBeTruthy()
        expect(product.get('name')).toBe("Test Product")
    })
})