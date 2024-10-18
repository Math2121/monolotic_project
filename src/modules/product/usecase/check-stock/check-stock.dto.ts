export default interface InputCheckStockDto {
    productID: string;
}

export interface CheckStockOutputDto {
    productID: string;
    stock:number
}