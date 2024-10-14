import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import  { FindInvoiceFacadeOutputDTO, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto, InvoiceFacadeInterface } from "./facade.interface";


export interface UseCaseProps {
    findUseCase: UseCaseInterface
    generateUseCase: UseCaseInterface
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
    private _findUseCase: UseCaseInterface
    private _generateUseCase: UseCaseInterface;

    constructor(usecasesProps: UseCaseProps) {
        this._findUseCase = usecasesProps.findUseCase
        this._generateUseCase = usecasesProps.generateUseCase
    }

    async generateInvoice(invoice: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
        return await this._generateUseCase.execute({ ...invoice });

    }
    async getInvoice(invoiceId: string): Promise<FindInvoiceFacadeOutputDTO> {

        return await this._findUseCase.execute({
            id: invoiceId,
        });
    }

}