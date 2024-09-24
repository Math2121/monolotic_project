import { Sequelize } from "sequelize-typescript"
import { ClientModel } from "../gateway/repository/client.model"
import ClientRepository from "../gateway/repository/client.repository"
import AddClientUseCase from "../usecase/add-client/add-client.usecase"
import ClientFacade from "./client.facade"
import FindClientUseCase from "../usecase/find-client/find-client.usecase"

describe("Client Facade tests", () => {
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

    it("should create a new client", async () => {
        const repository = new ClientRepository()
        const addUseCase = new AddClientUseCase(repository)

        const facade = new ClientFacade({
            addUseCase: addUseCase,
            findUseCase: undefined
        })
        const input = {
            name: "John Doe",
            email: "john.doe@example.com",
            address: "rua teste",
            id: "1"
        }

        await facade.add(input)

        const result = await ClientModel.findOne({
            where: { id: input.id },
        })

        expect(result.get("name")).toEqual("John Doe")
        expect(result.get("email")).toEqual("john.doe@example.com")



    })

    it("should find a client", async () => { 
        const repository = new ClientRepository()

        const findUseCase = new FindClientUseCase(repository)
        const facade = new ClientFacade({
            addUseCase: undefined,
            findUseCase: findUseCase
        })

        const input = {
            id: "1"
        }
        await ClientModel.create({
            id: "1",
            name: "John Doe",
            email: "john.doe@example.com",
            address: "123 Main St",
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        const result = await facade.find(input)
        expect(result.id.id).toEqual("1")
        expect(result.name).toEqual("John Doe")
        

    })
})