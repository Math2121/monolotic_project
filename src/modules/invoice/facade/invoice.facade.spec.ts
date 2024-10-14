import { Sequelize } from "sequelize-typescript"


import InvoiceModel from "../gateway/repository/invoice.model"
import InvoiceItemModel from "../gateway/repository/invoice.item.model"
import InvoiceFacadeFactory from "../factory/facade.factory"
import Id from "../../@shared/domain/value_object/ide.value_object"

describe("Product Facade", () => {
    let sequelize: Sequelize

    beforeAll(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        })

        await sequelize.addModels([InvoiceModel,InvoiceItemModel])
        await sequelize.sync()
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it("should generate a invoice", async () => {

        const invoiceFacade = InvoiceFacadeFactory.create()
        const input = {
            name: "Test Invoice",
            document: "1234567890",
            street: "Rua Teste",
            number: "10",
            complement: "Apto 201",
            city: "Teste City",
            state: "Teste State",
            zipCode: "123456",
            items: [
                {
                    id: new Id("1").id,
                    name: "Test Item",
                    price: 100,
                }
            ]
        }
        const output = await invoiceFacade.generateInvoice(input)
        expect(output.id).toBeTruthy()
        expect(output.total).toBe(100)
        expect(output.items).toBeTruthy()
        expect(output.items[0].price).toBe(100)
        
        

    })

    it("should get invoice", async () => {

        const invoiceFacade = InvoiceFacadeFactory.create()
        await InvoiceModel.create({
            id: "1",
            name: "Test Invoice",
            document: "1234567890",
            street: "Rua Teste",
            number: "10",
            complement: "Apto 201",
            city: "Teste City",
            state: "Teste State",
            zipCode: "123456",
            items: [
                {
                    id: new Id("1").id,
                    name: "Test Item",
                    price: 100,
                }
            ],
            total: 100
        })
        const input = {
            id: "1"
        }
        const invoices = await invoiceFacade.getInvoice(input.id)
        
        expect(invoices.id).toBe("1")
        expect(invoices.items).toBeTruthy()

    })
})