export interface ProcessPaymentInputDTO {
    amount: number;
    orderId: string;
}

export interface ProcessPaymentOutputDto {
    transactionId: string;
    status: string;
    amount: number;
    createdAt: Date
    updateAt: Date
    orderId: string;

}