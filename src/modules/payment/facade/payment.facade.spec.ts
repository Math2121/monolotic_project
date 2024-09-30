import { Sequelize } from "sequelize-typescript"
import TransactionModel from "../gateaway/repository/transaction.model"
import TransactionRepository from "../gateaway/repository/transaction.repository"
import ProcessPaymentUseCase from "../usecase/process-payment/process-payment.usecase"
import PaymentFacade from "./payment.facade"

describe("Product Facade", () => {
    let sequelize: Sequelize

    beforeAll(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        })

        await sequelize.addModels([TransactionModel])
        await sequelize.sync()
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it("should create a transaction", async () => {
        const repository = new TransactionRepository()
        const useCase = new ProcessPaymentUseCase(repository)

        const facade = new PaymentFacade(useCase)

        const input = {
            orderId: "order-123",
            amount: 100,
        }

        const output = await facade.process(input)

        expect(output.transactionId).toBeDefined()
        expect(output.status).toBe("approve")
        expect(output.amount).toBe(100)
        expect(output.orderId).toBe("order-123")
    })
})