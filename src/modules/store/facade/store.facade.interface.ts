import Product from "../domain/product.entity"

export interface FIndStoreFacadeInputDto {
    id: string
}
export interface FIndStoreFacadeOutputDto {
    id: string
    name: string
    description: string
    salesPrice: number
}

export interface FIndAllStoreFacadeOutputDto {
    products: Product[]
}
export interface StoreFacadeInterface {
    find(id: FIndStoreFacadeInputDto): Promise<FIndStoreFacadeOutputDto>
    findAll(): Promise<FIndAllStoreFacadeOutputDto>

}