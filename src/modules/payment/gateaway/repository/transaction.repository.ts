import Id from "../../../@shared/domain/value_object/ide.value_object";
import Transaction from "../../domain/transaction";
import PaymentGateway from "../payment-gateway";
import TransactionModel from "./transaction.model";

export default class TransactionRepository implements PaymentGateway {
    async save(input: Transaction): Promise<Transaction> {
        await TransactionModel.create({
            id: input.id.id,
            orderId: input.orderId,
            amount: input.amount,
            status: input.status,
            createdAt: input.createdAt,
            updatedAt: input.createdAt
        })

        return new Transaction({
            id: input.id,
            orderId: input.orderId,
            amount: input.amount,
            status: input.status,
            createdAt: input.createdAt,
            updatedAt: input.createdAt
        })
    }
}