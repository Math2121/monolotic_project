import AgregateRoot from "../../@shared/domain/entity/aggregate-root.interface"
import BaseEntity from "../../@shared/domain/entity/base.entity"
import Id from "../../@shared/domain/value_object/ide.value_object"
import Client from "./client.entity"
import Product from "./product.entity"

type OrderProps = {
    id?: Id
    client: Client
    products: Product[]
    status?: string
}

export default class Order extends BaseEntity implements AgregateRoot {
    private _client: Client
    private _products: Product[]
    private _status?: string
    
    constructor({ id, client, products, status }: OrderProps) { 

        super(id)
        this._client = client
        this._products = products
        this._status = status || "pending"

    }
    
    approved() {
        this._status = "approved"
    }
    get client(): Client {
        return this._client
    }
    
    get products(): Product[] {
        return this._products
    }
    
    get status(): string  {
        return this._status
    }

    get total() {
        return this._products.reduce((total, product) => total + product.salesPrice, 0)
    }
}