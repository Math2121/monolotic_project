import Id from "../../../@shared/domain/value_object/ide.value_object"
import Product from "../../domain/product.entity"
import FindAllProductUsecase from "./find-all.usecase"

const product = new Product({
    id: new Id("1"),
    name: 'Product 1',
    price: 100,
    description: 'Product 1 Description',
    salesPrice: 90
})

const product2 = new Product({
    id: new Id("2"),
    name: 'Product 2',
    price: 100,
    description: 'Product 2 Description',
    salesPrice: 90
})

const MockRepository = () => {
    return {
        async find(id: string): Promise<Product> {
            if (id === "1") {
                return product;
            } else if (id === "2") {
                return product2;
            }
            return undefined;
        },
        async findAll(): Promise<Product[]> {
            return [product, product2];
        }
    }
}
describe("Find all Tests Products", () => {

    it("should return all products", async () => {

        const productRepository = MockRepository();
        const usecase = new FindAllProductUsecase(productRepository)
        const result = await usecase.execute();

        expect(result).toEqual([product, product2]);

    }

    )
})