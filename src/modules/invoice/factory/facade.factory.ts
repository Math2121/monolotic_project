import InvoiceFacade from "../facade/invoice.facade";

import InvoiceRepository from "../gateway/repository/invoice.repository";

import FindUseCaseInvoice from "../usecase/find/find.usecase";
import GenerateInvoiceUseCase from "../usecase/generate/generate.usecase";

export default class InvoiceFacadeFactory {

    static create() {
        const invoiceRepository = new InvoiceRepository()
        const findUseCase = new FindUseCaseInvoice(invoiceRepository)
        const generateUseCase = new GenerateInvoiceUseCase(invoiceRepository)

        return new InvoiceFacade({
            findUseCase: findUseCase,
            generateUseCase: generateUseCase
        })
    }
}