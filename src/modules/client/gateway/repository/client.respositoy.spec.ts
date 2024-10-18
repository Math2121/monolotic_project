import { Sequelize } from "sequelize-typescript"
import { ClientModel } from "./client.model"
import ClientRepository from "./client.repository"
import Id from "../../../@shared/domain/value_object/ide.value_object"
import Client from "../../domain/entity"

describe("Client Repository tests", () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        })

        await sequelize.addModels([ClientModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should create a client", async () => {
        const repository = new ClientRepository()
        const client = new Client({
            id: new Id("1"),
            name: "John Doe",
            email: "john.doe@example.com",
            address: "123 Main St",
        })

        await repository.add(client)


        const result = await ClientModel.findOne({
            where: { id: client.id.id },
        })

        expect(result.get("name")).toEqual("John Doe")


    })

    it("should find a client by id", async () => {
        const repository = new ClientRepository()
        const client = await ClientModel.create({
            id: "1",
            name: "John Doe",
            email: "john.doe@example.com",
            address: "123 Main St",
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        const result = await repository.find("1")

        expect(client.get("id")).toEqual(result.id.id)
        expect(client.get("name")).toEqual(result.name)
        expect(client.get("email")).toEqual(result.email)
    })
})