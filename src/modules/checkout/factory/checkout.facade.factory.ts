import ClientFacadeFactory from "../../client/factory/client.facade.factory";
import InvoiceFacadeFactory from "../../invoice/factory/facade.factory";
import PaymentFacadeFactory from "../../payment/factory/facade.factory";
import ProductFacadeFactory from "../../product/factory/facade.product";
import StoreFacadeFactory from "../../store/factory/facade.factory";
import OrderRepository from "../repository/order.repository";
import PlaceOrderUseCase from "../usecases/place-order/place-order.usecase";


export default class CheckoutFacadeFactory {
    static create() {
        const clientFacade = ClientFacadeFactory.create();
        const productFacade = ProductFacadeFactory.create();
        const storeFacade = StoreFacadeFactory.create();
        const orderRepository = new OrderRepository();
        const invoice = InvoiceFacadeFactory.create();
        const payment = PaymentFacadeFactory.create();
        const usecase = new PlaceOrderUseCase(
            clientFacade,
            productFacade,
            storeFacade,
            orderRepository,
            invoice,
            payment);

        return usecase;
    }
}