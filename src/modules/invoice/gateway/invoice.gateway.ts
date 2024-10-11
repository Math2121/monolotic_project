import Invoice from "../domain/invoice";

export default interface InvoiceGateway {
    find(id: string): Promise<Invoice>
    save(input:Invoice): Promise<void>
}