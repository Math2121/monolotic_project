import AddClientUseCase from "./add-client.usecase"

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn(),
    }
}

describe("Add client usecase unit test", () => {
    it("should add a client", async () => {
        const mockRepository = MockRepository()
        const addClient = new AddClientUseCase(mockRepository)

        const client = {
            name: "John Doe",
            email: "john.doe@example.com",
            address: "teste rua",
            id: "1"
        }

        const result = await addClient.execute(client)

        expect(mockRepository.add).toHaveBeenCalled()
    })
})