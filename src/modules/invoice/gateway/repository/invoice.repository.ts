import Id from "../../../@shared/domain/value_object/ide.value_object";
import Invoice from "../../domain/invoice";
import Address from "../../domain/value-object";
import InvoiceGateway from "../invoice.gateway";
import InvoiceItemModel from "./invoice.item.model";
import InvoiceModel from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway {
    async find(id: string): Promise<Invoice> {
        const result = await InvoiceModel.findOne({ where: { id }, include: [InvoiceItemModel] });
        const items = result.get('items')
        return new Invoice({
            id: new Id(result.id),
            name: result.name,
            document: result.document,
            address: new Address({
                street: result.street,
                number: result.number,
                complement: result.complement,
                city: result.city,
                state: result.state,
                zipCode: result.zipCode,
            }),
            items: items.map((it) => ({
                id: new Id(it.id),
                name: it.name,
                price: it.price,

            }))
        });
    }
    async save(input: Invoice): Promise<void> {
        try {


            await InvoiceModel.create({
                id: input.id.id,
                name: input.name,
                document: input.document,
                street: input.address.street,
                number: input.address.number,
                complement: input.address.complement,
                city: input.address.city,
                state: input.address.state,
                zipCode: input.address.zipCode,
                items: input.items.map((item) => ({
                    id: item.id.id,
                    name: item.name,
                    price: item.price,
                })),
                total: input.total(),
                createdAt: input.createdAt,
            }, {
                include: [InvoiceItemModel]
            });
        } catch (error) {
            console.log(error);
        }
    }

}