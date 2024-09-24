import Id from "../../../../@shared/domain/value_object/ide.value_object"
import Client from "../../entity"
import FindClientUseCase from "./find-client.usecase"

const client = new Client({
    id: new Id("1"),
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Main St'
})
const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(client))
    }
}

describe("Find Client Use case", () => { 
    it("should find a client", async () => { 
        const mockRepository = MockRepository()
        const findClientUseCase = new FindClientUseCase(mockRepository)

        const input = {
            id: "1"
        }

        const result = await findClientUseCase.execute(input)

        expect(result.name).toEqual("John Doe")
    })
})