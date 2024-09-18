import { Sequelize } from "sequelize-typescript"
import ProductModel from "../gateway/repository/product.model"
import StoreFacadeFactory from "../factory/facade.factory"
import Id from "../../@shared/domain/value_object/ide.value_object"

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

    it("should find a product", async () => {

        await ProductModel.create({
            id: 1,
            name: "Test Product",
            description: "teste",
            salesPrice: 100,
        })

        const facade = StoreFacadeFactory.create()
        const result = await facade.find({ id: "1" })
        expect(result).toEqual({
            id: "1",
            name: "Test Product",
            description: "teste",
            salesPrice: 100
        })
    })


})