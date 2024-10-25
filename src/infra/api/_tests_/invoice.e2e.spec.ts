import Id from "../../../modules/@shared/domain/value_object/ide.value_object";
import Invoice from "../../../modules/invoice/domain/invoice";
import Address from "../../../modules/invoice/domain/value-object";
import InvoiceRepository from "../../../modules/invoice/gateway/repository/invoice.repository";

import { app, sequelize } from "../../express";
import request from "supertest";

describe("E2E test for invoice", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should do the invoice", async () => {
        const address = new Address({
            street: "Main Street",
            number: "123",
            complement: "Next to the bank",
            city: "New York",
            state: "New York",
            zipCode: "122343404",
        });

        const item1 = {
            id: new Id("1"),
            name: "Product 1",
            price: 100,
        }

        const item2 = {
            id: new Id("2"),
            name: "Product 2",
            price: 200,
        }

        const invoice = new Invoice({
            id: new Id("123"),
            name: "Invoice 1",
            document: "Document 1",
            items: [item1, item2],
            address: address,
        });

        const invoiceRepository = new InvoiceRepository();

        await invoiceRepository.save(invoice);
        const response = await request(app).get(`/invoice/${123}`);

        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual("Invoice 1");
    });
});