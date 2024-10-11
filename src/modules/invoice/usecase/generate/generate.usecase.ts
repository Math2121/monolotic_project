import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import Invoice from "../../domain/invoice";
import Address from "../../domain/value-object";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate.dto";

export default class GenerateInvoiceUseCase implements UseCaseInterface {
    constructor(private repository: InvoiceGateway) {

    }
    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {

        const address = new Address({
            street: input.street,
            number: input.number,
            complement: input.complement,
            city: input.city,
            state: input.state,
            zipCode: input.zipCode
        })
        const invoice = new Invoice({
            name: input.name,
            document: input.document,
            address: address,
            items: input.items.map(item => ({
                name: item.name,
                price: item.price
            }))
        })

        const output = await this.repository.save(invoice)

        return {
            id: output.id.id,
            name: output.name,
            document: output.document,
            street: output.address.street,
            number: output.address.number,
            complement: output.address.complement,
            city: output.address.city,
            state: output.address.state,
            zipCode: output.address.zipCode,
            items: output.items.map(item => ({
                id: item.id.id,
                name: item.name,
                price: item.price
            })),
            total: invoice.total()
        }
    }

}