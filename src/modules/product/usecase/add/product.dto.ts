
export default interface AddProductDto {
    id: string
    name: string
    description: string
    purchasePrice: number
    stock:number

}

export interface AddProductOutputDto {
    id: string
    name: string
    description: string
    purchasePrice: number
    stock: number
}