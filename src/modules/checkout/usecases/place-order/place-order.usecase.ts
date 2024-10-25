import Id from "../../../@shared/domain/value_object/ide.value_object";
import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import { ClientFacadeInterface } from "../../../client/facade/client.facade.interface";
import { InvoiceFacadeInterface } from "../../../invoice/facade/facade.interface";
import PaymentFacadeInterface from "../../../payment/facade/facade.interface";
import ProductFacadeInterface from "../../../product/facade/product.facade.interface";
import StoreFacade from "../../../store/facade/store.facade";
import { StoreFacadeInterface } from "../../../store/facade/store.facade.interface";
import Client from "../../domain/client.entity";
import Order from "../../domain/order.entity";
import Product from "../../domain/product.entity";
import CheckoutGateway from "../../gateway/checkout.gateway";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";

export default class PlaceOrderUseCase implements UseCaseInterface {
    private _clientFacade: ClientFacadeInterface
    private _productFacade: ProductFacadeInterface
    private _catalogueFacade: StoreFacadeInterface
    private _repository: CheckoutGateway
    private _invoiceFacade: InvoiceFacadeInterface
    private _paymentFacade: PaymentFacadeInterface

    constructor(clientFacade: ClientFacadeInterface,
        productFacade: ProductFacadeInterface,
        catalogueFacade: StoreFacadeInterface,
        repository: CheckoutGateway,
        invoiceFacade: InvoiceFacadeInterface,
        paymentFacade: PaymentFacadeInterface
    ) {
        this._clientFacade = clientFacade
        this._productFacade = productFacade
        this._catalogueFacade = catalogueFacade
        this._repository = repository
        this._invoiceFacade = invoiceFacade
        this._paymentFacade = paymentFacade

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
        const products = await Promise.all(
            input.products.map((p) => this.getProduct(p.productId))
        )

        // criar o objeto client
        const myClient = new Client({
            id: new Id(client.id.id),
            name: client.name,
            email: client.email,
            street: client.street,
            number: client.number,
            city: client.city,
            zipCode: client.zipCode,
            state: client.state,
            complement: client.complement
        })

        //criar o objeto de ordem

        const order = new Order({
            client: myClient,
            products,
        })

        // processar pagamento
        const payment = await this._paymentFacade.process({
            orderId: order.id.id,
            amount: order.total
        })

        const invoice = payment.status === "approved" ?
                await this._invoiceFacade.generateInvoice({
                    name: client.name,
                    document: client.document,
                    street: client.street,
                    city: client.city,
                    complement: client.complement,
                    state: client.state,
                    zipCode: client.zipCode,
                    number: client.number,
                    items: products.map((p) => {
                        return {
                            id: p.id.id,
                            name: p.name,
                            price: p.salesPrice
                        }
                    })
                }) : null
        // caso o pagamento e aprovado e gerado um invoice
        payment.status === "approved" && order.approved()
        this._repository.addOrder(order)


        return {
            id: order.id.id,
            invoiceId: payment.status === "approved" ? invoice.id : null,
            total: order.total,
            status: order.status,
            products: order.products.map((p) => {
                return {
                    productId: p.id.id
                }
            })
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

    private async getProduct(productId: string): Promise<Product> {
        const product = await this._catalogueFacade.find({ id: productId })
        if (!product) {
            throw new Error(`Product not found`);
        }
        const productProps = {
            id: new Id(product.id),
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice
        }
        return new Product(productProps)

    }

}