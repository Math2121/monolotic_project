
import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "./invoice.model";
import InvoiceItemModel from "./invoice.item.model";
import Invoice from "../../domain/invoice";
import Address from "../../domain/value-object";
import Id from "../../../@shared/domain/value_object/ide.value_object";
import InvoiceRepository from "./invoice.repository";

describe("Invoice Repository test", () => {
    let sequelize: Sequelize;

    beforeAll(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        })
        await sequelize.addModels([InvoiceModel, InvoiceItemModel]);
        await sequelize.sync();
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a invoice", async () => {
        const invoice = new Invoice({
            id: new Id("1"),
            name: "John Doe",
            document: "123456789",
            address: new Address({
                street: "Street",
                number: "123",
                complement: "Complement",
                city: "City",
                state: "State",
                zipCode: "12345678"
            }),
            items: [
                {
                    id: new Id("1"),
                    name: "Item 1",
                    price: 100,
                },
                {
                    id: new Id("2"),
                    name: "Item 2",
                    price: 200,
                }
            ]
        });
        const repository = new InvoiceRepository();
        await repository.save(invoice);

        const resultFind = await InvoiceModel.findOne({
            where: { id: "1" },
            include: [InvoiceItemModel],
        });
        expect(resultFind).toBeDefined();
        expect(resultFind.id).toBe(invoice.id.id);
        expect(resultFind.name).toBe(invoice.name);
        expect(resultFind.document).toBe(invoice.document);
        expect(resultFind.street).toBe(invoice.address.street);
        expect(resultFind.number).toBe(invoice.address.number);
        expect(resultFind.complement).toBe(invoice.address.complement);
        expect(resultFind.city).toBe(invoice.address.city);
        expect(resultFind.state).toBe(invoice.address.state);
        expect(resultFind.zipCode).toBe(invoice.address.zipCode);
        expect(resultFind.items).toHaveLength(2);
        expect(resultFind.items[0].id).toBe(invoice.items[0].id.id);
        expect(resultFind.items[0].name).toBe(invoice.items[0].name);
        expect(resultFind.items[0].price).toBe(invoice.items[0].price);
        expect(resultFind.items[1].id).toBe(invoice.items[1].id.id);
        expect(resultFind.items[1].name).toBe(invoice.items[1].name);
        expect(resultFind.items[1].price).toBe(invoice.items[1].price);
        expect(resultFind.total).toBe(300);
    });

    it("should find a invoice", async () => {
        const invoice = new Invoice({
            id: new Id("1"),
            name: "John Doe",
            document: "123456789",
            address: new Address({
                street: "Street",
                number: "123",
                complement: "Complement",
                city: "City",
                state: "State",
                zipCode: "12345678"
            }),
            items: [
                {
                    id: new Id("1"),
                    name: "Item 1",
                    price: 100,
                },
                {
                    id: new Id("2"),
                    name: "Item 2",
                    price: 200,
                }
            ]
        });
        const repository = new InvoiceRepository();
        await repository.save(invoice);

        const resultFind = await repository.find(invoice.id.id);

        expect(resultFind).toBeDefined();
        expect(resultFind.id.id).toBe(invoice.id.id);
        expect(resultFind.name).toBe(invoice.name);
        expect(resultFind.document).toBe(invoice.document);
        expect(resultFind.address.street).toBe(invoice.address.street);
        expect(resultFind.address.number).toBe(invoice.address.number);
        expect(resultFind.address.complement).toBe(invoice.address.complement);
        expect(resultFind.address.city).toBe(invoice.address.city);
        expect(resultFind.address.state).toBe(invoice.address.state);
        expect(resultFind.address.zipCode).toBe(invoice.address.zipCode);
        expect(resultFind.items).toHaveLength(2);
        expect(resultFind.items[0].id.id).toBe(invoice.items[0].id.id);
        expect(resultFind.items[0].name).toBe(invoice.items[0].name);
        expect(resultFind.items[0].price).toBe(invoice.items[0].price);
        expect(resultFind.items[1].id.id).toBe(invoice.items[1].id.id);
        expect(resultFind.items[1].name).toBe(invoice.items[1].name);
        expect(resultFind.items[1].price).toBe(invoice.items[1].price);
        expect(resultFind.total).toBe(300);
    })
})
