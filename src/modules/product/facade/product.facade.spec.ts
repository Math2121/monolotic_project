import { Sequelize } from "sequelize-typescript"
import { ProductModel } from "../gateway/repository/product.model"
import ProductRepository from "../gateway/repository/product.repository"
import AddProductUseCase from "../usecase/add/product.usecase"
import ProductFacade from "./product.facade"
import ProductFacadeFactory from "../factory/facade.product"

describe("Product Facade", () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        })

        await sequelize.addModels([ProductModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should create a new Product", async () => {

        const productFacade = ProductFacadeFactory.create()
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

    it("should check  Product stock", async () => {

        const productFacade = ProductFacadeFactory.create()
        const input = {
            id: "1",
            name: "Test Product",
            purchasePrice: 100,
            stock: 10,
            description: "teste"
        }
        await productFacade.addProduct(input)

        const result = await productFacade.checkStock({
            productID:"1"
        })

        expect(result.productID).toBe("1")
        expect(result.stock).toBe(10)

    })
})