import Id from "../../@shared/domain/value_object/ide.value_object"

export type AddressProps = {
    street: string
    city: string
    state: string
    zipCode: string
    number: string;
    complement: string;
}
export default class Address {
    private _street: string
    private _city: string
    private _state: string
    private _zipCode: string
    private _number: string
    private _complement: string

    constructor(props: AddressProps) {
        this._street = props.street
        this._city = props.city
        this._state = props.state
        this._zipCode = props.zipCode
        this._number = props.number
        this._complement = props.complement
    }

    get street(): string {
        return this._street
    }

    set street(value: string) {
        this._street = value
    }

    get city(): string {
        return this._city
    }

    set city(value: string) {
        this._city = value
    }

    get state(): string {
        return this._state
    }

    set state(value: string) {
        this._state = value
    }

    get zipCode(): string {
        return this._zipCode
    }

    set zipCode(value: string) {
        this._zipCode = value
    }

    get number(): string {
        return this._number
    }
    set number(value: string) {
        this._number = value
    }
    get complement(): string {
        return this._complement
    }
    set complement(value: string) {
        this._complement = value
    }



}