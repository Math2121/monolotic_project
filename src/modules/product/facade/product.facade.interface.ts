export interface AddProductFacadeDtoInterface {
    id?: string
    name: string
    description: string
    purchasePrice: number
    stock: number
}

export interface CheckProductFacadeDtoInterface {
    productID: string
}

export interface CheckProductOutputFacadeDtoInterface {
    productID: string
    stock: number
}
export default interface ProductFacadeInterface {
    addProduct(input: AddProductFacadeDtoInterface): Promise<void>
    checkStock(input: CheckProductFacadeDtoInterface): Promise<CheckProductOutputFacadeDtoInterface>
}