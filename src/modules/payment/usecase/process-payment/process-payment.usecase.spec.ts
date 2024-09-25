import Id from "../../../@shared/domain/value_object/ide.value_object"
import Transaction from "../../domain/transaction"
import ProcessPaymentUseCase from "./process-payment.usecase"

const transaction = new Transaction({
    id: new Id("1"),
    amount: 90,
    orderId:"1"
})
const MockRepository = () => {
    return {
        save: jest.fn().mockResolvedValue(Promise.resolve(transaction))
    }
}
describe("Process Payment tests", () => { 

    it("should process payment", async () => { 
        const mockRepository = MockRepository()
        const paymentProcessor = new ProcessPaymentUseCase(mockRepository)

        const input = {
            orderId: "1",
            amount:90
        }

        const result = await paymentProcessor.execute(input)

        expect(mockRepository.save).toBeCalledTimes(1)
        expect(result.transactionId).toBe("1")
        expect(result.status).toBe("pending")
        expect(result.amount).toBe(90)
        
      
    })

})