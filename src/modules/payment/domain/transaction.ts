import AgregateRoot from "../../@shared/domain/entity/aggregate-root.interface"
import BaseEntity from "../../@shared/domain/entity/base.entity"
import Id from "../../@shared/domain/value_object/ide.value_object"

type TransactionProps = {
    id?: Id
    amount: number
    orderId: string
    status: string
    createdAt?: Date
    updatedAt?: Date
}

export default class Transaction extends BaseEntity implements AgregateRoot {

    private _amount: number
    private _orderId: string
    private _status: string


    constructor(props: TransactionProps) {
        super(props.id)
        this._amount = props.amount
        this._orderId = props.orderId
        this._status = props.status || "pending"
    }

    get amount(): number {
        return this._amount
    }
    get orderId(): string {
        return this._orderId
    }
    get status(): string {
        return this._status
    }


    validate(): void {
        if (this.amount <= 0) {
            throw new Error("Transaction amount must be greater than zero")
        }
    }

    approve(): void{
        this._status = "approve"
    }

    decline(): void {
        this._status = "decline"
    }

    process(): void {
        if (this._amount >= 100) {
            this.approve()
        } else {
            this.decline()
        }
    }
}