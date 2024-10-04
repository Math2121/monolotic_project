import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import InvoiceGateway from "../../gateway/invoice.gateway";
import FindInvoiceUseCaseInputDTO, { FindInvoiceUseCaseOutputDTO } from "./find.dto";

export default class FindUseCaseInvoice implements UseCaseInterface {
    constructor(private repository: InvoiceGateway) {

    }
    async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {


        const invoice = await this.repository.find(input.id);
        if (!invoice) {
            throw new Error("Invoice not found");
        }

        return {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            address: {
                street: invoice.address.street,
                number: invoice.address.number,
                complement: invoice.address.complement,
                city: invoice.address.city,
                state: invoice.address.state,
                zipCode: invoice.address.zipCode,
            },
            items: invoice.items.map((it) => {
                return {
                    id: it.id.id,
                    name: it.name,
                    price: it.price,
                };
            }),
            total: invoice.total(),
            createdAt: invoice.createdAt,

        };


    }

}