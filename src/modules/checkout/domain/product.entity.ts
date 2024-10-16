import AgregateRoot from "../../@shared/domain/entity/aggregate-root.interface"
import BaseEntity from "../../@shared/domain/entity/base.entity"
import Id from "../../@shared/domain/value_object/ide.value_object"

type ProductProps = {
    id?: Id
    name: string
    description: string
    salesPrice: number
}

export default class Product extends BaseEntity implements AgregateRoot {
    private _name: string
    private _description: string
    private _salesPrice: number

    constructor({ id, name, description, salesPrice }: ProductProps) {
        super(id)
        this._name = name
        this._description = description
        this._salesPrice = salesPrice
    }

    get name(): string {
        return this._name
    }
    get description(): string {
        return this._description
    }
    get salesPrice(): number {
        return this._salesPrice
    }


}