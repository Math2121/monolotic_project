export default interface FindAllProductDto {
    products: {
        id: number;
        name: string;
        salesPrice: number;
        description: string;
    }[]
}