import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import { ClientFacadeInterface } from "../../../client/facade/client.facade.interface";
import ProductFacadeInterface from "../../../product/facade/product.facade.interface";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";

export default class PlaceOrderUseCase implements UseCaseInterface {
    private _clientFacade: ClientFacadeInterface
    private _productFacade: ProductFacadeInterface 
    constructor(clientFacade: ClientFacadeInterface, productFacade: ProductFacadeInterface) {
        this._clientFacade = clientFacade
        this._productFacade = productFacade
    }
    async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
        //buscar client
        const client = await this._clientFacade.find({
            id: input.clientId
        })
        if (!client) {
            throw new Error("Client not found");
        }
        //validar produtos
        await this.validateProducts(input)
        // recuperar os produtos

        // criar o objeto client

        //criar o objeto de ordem

        // processar pagamento

        // caso o pagamento e aprovado e gerado um invoice


        // mudar status da order para aprovado



        return {
            id: "123",
            invoiceId: "456",
            total: 100,
            status: "pending",
            products: []
        }
    }

    private async validateProducts(input: PlaceOrderInputDto): Promise<void> {
        if (input.products.length === 0) {
            throw new Error("No product selected");
        }

        for (const p of input.products) {
            const product = await this._productFacade.checkStock({
                productID: p.productId
            })

            if (product.stock <= 0) {
                throw new Error(`Product ${product.productID} is not available in stock`);
            }
        }

    }

}