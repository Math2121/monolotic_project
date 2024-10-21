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
            id: "1",
            city: "same city",
            complement: "same ",
            number: "20",
            state: "state",
            street: "25",
            document: "005",
            zipCode: "254896",
        }


        

        const result = await addClient.execute(client)

        expect(mockRepository.add).toHaveBeenCalled()
    })
})