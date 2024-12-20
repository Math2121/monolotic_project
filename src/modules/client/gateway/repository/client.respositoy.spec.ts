import { Sequelize } from "sequelize-typescript"
import { ClientModel } from "./client.model"
import ClientRepository from "./client.repository"
import Id from "../../../@shared/domain/value_object/ide.value_object"
import Client from "../../domain/entity"

describe("Client Repository tests", () => {
    let sequelize: Sequelize

    beforeAll(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        })

        await sequelize.addModels([ClientModel])
        await sequelize.sync()
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it("should create a client", async () => {
        const repository = new ClientRepository()
        const client = new Client({
            id: new Id("1"),
            name: "John Doe",
            email: "john.doe@example.com",
            document: "doc",
            street:'street',
            state:'state',
            complement: 'complement',
            zipCode: 'zipcode',
            number: '2',
            city: 'city',

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
            id: "2",
            name: "John Doe",
            email: "john.doe@example.com",
            address: "123 Main St",
            document: "doc",
            street: 'street',
            state: 'state',
            complement: 'complement',
            zipCode: 'zipcode',
            number: '2',
            city: 'city',
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        const result = await repository.find("2")

        expect(client.get("id")).toEqual(result.id.id)
        expect(client.get("name")).toEqual(result.name)
        expect(client.get("email")).toEqual(result.email)
    })
})