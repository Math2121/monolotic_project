import Invoice from "../../domain/invoice"
import Address from "../../domain/value-object"
import FindUseCaseInvoice from "./find.usecase"

const address = new Address({
    street: "123 Main St",
    city: "Anytown",
    state: "CA",
    number: "123",
    complement: "Apt 4B",
    zipCode: "12345",
})
const invoice = new Invoice(
    {
        name: "John Doe",
        document: "INV-001",
        address,
        items: [
            {
                name: "Teste",
                price: 25400
            },
            {
                name: "Teste",
                price: 26000
            },
        ],
    }

)
const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValueOnce(invoice),
    }


}

describe("Invoice Test usecase", () => {
    it("should find a invoice", async () => {
        const mockRepository = MockRepository()
        const invoiceUsecase = new FindUseCaseInvoice(mockRepository)

        const input = {
            id: "123"
        }

        const output = await invoiceUsecase.execute(input)
        expect(mockRepository.find).toBeCalledWith(input.id)
        expect(output.name).toEqual("John Doe")
        expect(output.address.street).toEqual("123 Main St")
        expect(output.items[0].name).toEqual("Teste")
        expect(output.items[0].price).toEqual(25400)
        expect(output.items[1].name).toEqual("Teste")
        expect(output.items[1].price).toEqual(26000)
        expect(output.document).toEqual("INV-001")
        expect(output.address.city).toEqual("Anytown")
        expect(output.address.state).toEqual("CA")
        expect(output.total).toEqual(51400)
    })
})
