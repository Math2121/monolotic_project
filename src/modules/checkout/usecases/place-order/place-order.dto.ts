export interface PlaceOrderInputDto {
    clientId: string
    products: {
        productID: string
        
    }[]
}

export interface PlaceOrderOutputDto {
    id: string
    invoiceId: string
    total: number
    status: string
    products: {
        productId: string
    }[]

}

