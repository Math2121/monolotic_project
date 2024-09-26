import { Sequelize } from "sequelize-typescript"
import TransactionModel from "./transaction.model"
import TransactionRepository from "./transaction.repository"
import Transaction from "../../domain/transaction"
import Id from "../../../@shared/domain/value_object/ide.value_object"

describe("Transaction Repository", () => { 
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
        const transactionRepository = new TransactionRepository()
        const input = {
            orderId: "123",
            amount: 100,
            status: "pending",
            createdAt: new Date(),
            updatedAt: new Date(),
            id: new Id('1'),
        }
        const transaction = new Transaction(input)
        const transactionRepo = await transactionRepository.save(transaction)

        expect(transactionRepo.id).toEqual(new Id('1'))
        expect(transactionRepo.orderId).toEqual("123")
        expect(transactionRepo.amount).toEqual(100)
        expect(transactionRepo.status).toEqual("pending")
    })
})