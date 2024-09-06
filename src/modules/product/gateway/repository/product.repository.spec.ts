import { Sequelize } from "sequelize-typescript"

import Product from "../../domain/product.entity"
import ProductRepository from "./product.repository"
import { ProductModel } from "./product.model"
import Id from "../../../@shared/domain/value_object/ide.value_object"

describe("Product Repository tests", () => {
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

    it("should create a new product", async () => {
        const props = {
            name: "Test Product",
            purchasePrice: 10.99,
            stock: 100,
            description: "This is a test product",
            id: new Id("")
        }
        const product = new Product(props)
        const productRepository = new ProductRepository()



        await productRepository.add(product)

        const productFind = await ProductModel.findOne({
            where: {
                id: props.id.id,
            },
        })

        expect(productFind).toBeTruthy()
        expect(props.name).toEqual(productFind.get('name'))



    })

    it("should find a product by id", async () => {
        const props = {
            name: "Test Product",
            purchasePrice: 10.99,
            stock: 100,
            description: "This is a test product",
            id: new Id("")
        }
        const product = new Product(props)
        const productRepository = new ProductRepository()

        await productRepository.add(product)

        const foundProduct = await productRepository.find(props.id.id.toString())

        expect(foundProduct).toBeTruthy()
        expect(foundProduct.name).toEqual("Test Product")



    })
})