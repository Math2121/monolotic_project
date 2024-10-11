import Id from "../../../@shared/domain/value_object/ide.value_object"
import Invoice from "../../domain/invoice"
import Address from "../../domain/value-object"
import { GenerateInvoiceUseCaseInputDto } from "./generate.dto"
import GenerateInvoiceUseCase from "./generate.usecase"

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
        save: jest.fn()
    }

}

describe("Invoice Generate usecase test", () => {
    it("should find a invoice", async () => {
        const repository = MockRepository()
        repository.save = jest.fn().mockReturnValue({
            id: new Id(""),
            name: "John Doe",
            document: "INV-001",
            address: {
                street: "123 Main St",
                city: "Anytown",
                state: "CA",
                number: "123",
                complement: "Apt 4B",
                zipCode: "12345",
            },
            items: [
                {
                    id: new Id(""),
                    name: "Teste",
                    price: 25400
                },
                {
                    id: new Id(""),
                    name: "Teste",
                    price: 26000
                },
            ],
        })
        const invoiceGenerate = new GenerateInvoiceUseCase(repository)

        const input = {
            name: "John Doe",
            document: "INV-001",
            street: "123 Main St",
            number: "123",
            complement: "Apt 4B",
            city: "Anytown",
            state: "CA",
            zipCode: "12345",
            items: [
                {
                    id: "1",
                    name: "Teste",
                    price: 25400
                },
                {
                    id: "2",
                    name: "Teste",
                    price: 26000
                },
            ],
        }
        const output = await invoiceGenerate.execute(input)

        expect(output.id).toBeTruthy()
        expect(output.name).toBe(invoice.name)
        expect(output.document).toBe(invoice.document)
        expect(output.street).toBe(invoice.address.street)
        expect(output.number).toBe(invoice.address.number)
        expect(output.complement).toBe(invoice.address.complement)
        expect(output.city).toBe(invoice.address.city)
        expect(output.state).toBe(invoice.address.state)
        expect(output.zipCode).toBe(invoice.address.zipCode)
        expect(output.total).toBe(51400)


    })
})
