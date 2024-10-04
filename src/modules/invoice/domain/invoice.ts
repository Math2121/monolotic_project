import AgregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value_object/ide.value_object";
import Address from "./value-object";
export type InvoiceItems = {
    id?: Id,
    name: string
    price: number
}

export type InvoiceProps = {
    id?: Id,
    name: string,
    document: string,
    address: Address,
    items: InvoiceItems[],
}
export default class Invoice extends BaseEntity implements AgregateRoot {

    private _name: string
    private _document: string
    private _address: Address
    private _items: InvoiceItems[]

    constructor(props: InvoiceProps) {
        super(props.id || new Id(""));
        this._name = props.name
        this._document = props.document
        this._address = props.address
        this._items = props.items.map(item => ({...item, id: new Id("")}))

    }

    get name(): string {
        return this._name;
    }
    set name(value: string) {
        this._name = value;
        this.updatedAt = new Date();
    }
    get document(): string {
        return this._document;
    }
    set document(value: string) {
        this._document = value;
        this.updatedAt = new Date();
    }
    get address(): Address {
        return this._address;
    }
    set address(value: Address) {
        this._address = value;
        this.updatedAt = new Date();
    }
    get items(): InvoiceItems[] {
        return this._items;
    }
    set items(value: InvoiceItems[]) {
        this._items = value;
        this.updatedAt = new Date();
    }

    total() {
        return this._items.reduce((sum, item) => sum + (item.price), 0)
    }

}