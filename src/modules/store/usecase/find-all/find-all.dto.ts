export default interface FindAllProductDto {
    products: {
        id: number;
        name: string;
        price: number;
        salesPrice: number;
        description: string;
    }[]
}