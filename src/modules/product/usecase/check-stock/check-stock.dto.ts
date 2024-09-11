export default interface InputCheckStockDto {
    productId: string;
}

export interface CheckStockOutputDto {
    productId: string;
    stock:number
}