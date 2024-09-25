
import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import Transaction from "../../domain/transaction";
import PaymentGateway from "../../gateaway/payment-gateway";
import { ProcessPaymentInputDTO, ProcessPaymentOutputDto } from "./process-payment.dto";

export default class ProcessPaymentUseCase implements UseCaseInterface{

    constructor(
        private transactionRepository: PaymentGateway
    ){}
    async execute(input: ProcessPaymentInputDTO): Promise<ProcessPaymentOutputDto> {
        const transaction = new Transaction({
            amount: input.amount,
            orderId: input.orderId
        })

        transaction.process()

        const transactionRepository = await this.transactionRepository.save(transaction)
        return {
            transactionId: transactionRepository.id.id,
            status: transactionRepository.status,
            amount: transactionRepository.amount,
            createdAt: transactionRepository.createdAt,
            updateAt: transactionRepository.updatedAt,
            orderId: transactionRepository.orderId
        }
        
    }
}