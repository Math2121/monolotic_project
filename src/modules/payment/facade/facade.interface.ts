export interface PaymentFacadeInterfaceInputDto {
    orderId: string
    amount: number
}

export interface ProcessPaymentFacadeOutputDto {
    transactionId: string;
    status: string;
    amount: number;
    createdAt: Date
    updateAt: Date
    orderId: string;

}

export default interface PaymentFacadeInterface {
    process(input: PaymentFacadeInterfaceInputDto): Promise<ProcessPaymentFacadeOutputDto>
}