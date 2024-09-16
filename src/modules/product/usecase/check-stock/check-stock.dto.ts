export default interface InputCheckStockDto {
    productID: string;
}

export interface CheckStockOutputDto {
    productId: string;
    stock:number
}