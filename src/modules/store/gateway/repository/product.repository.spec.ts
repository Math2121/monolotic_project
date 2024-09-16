import { Sequelize } from "sequelize-typescript"
import ProductModel from "./product.model"

describe("Product store repository test", () => {

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

    it("should find all Product models", async () => {


        await ProductModel.create({
            id: "1",
            name: "Product 1",
            salesPrice: 100,
            description: "teste",
        })
        await ProductModel.create({
            id: "2",
            name: "Product 2",
            salesPrice: 100,
            description: "teste",
        })
        const productRepository = new ProductRepository()
        const products = await productRepository.findAll()
        expect(products.length).toBe(2)
        expect(products[0].id).toBe("1")
        expect(products[1].id).toBe("2")
        expect(products[0].name).toBe("Product 1")
        expect(products[1].name).toBe("Product 2")
        expect(products[0].salesPrice).toBe(100)
        expect(products[1].salesPrice).toBe(100)
    })
})