import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import PaymentFacadeInterface, { PaymentFacadeInterfaceInputDto, ProcessPaymentFacadeOutputDto } from "./facade.interface";

export default class PaymentFacade implements PaymentFacadeInterface {
    constructor(private processPaymentUseCase: UseCaseInterface) {

    }

    async process(input: PaymentFacadeInterfaceInputDto): Promise<ProcessPaymentFacadeOutputDto> {
        return this.processPaymentUseCase.execute(input);
    }

}