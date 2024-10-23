import AgregateRoot from "../../@shared/domain/entity/aggregate-root.interface"
import BaseEntity from "../../@shared/domain/entity/base.entity"
import Id from "../../@shared/domain/value_object/ide.value_object"

type ClientProps = {
    id?: Id
    name: string
    email: string
    street: string,
    number: string,
    city: string,
    zipCode: string,
    state: string,
    complement: string
}

export default class Client extends BaseEntity implements AgregateRoot {
    private _name: string
    private _email: string
    private _street: string;
    private _number: string;
    private _city: string;
    private _zipCode: string;
    private _state: string;
    private _complement: string;

    constructor({ id, name, email,  
        street, number, city, zipCode, state, complement

    }: ClientProps) {
        super(id)
        this._name = name
        this._email = email
        this._street = street
        this._number = number
        this._city = city
        this._zipCode = zipCode
        this._state = state
        this._complement = complement
        

    }
    get name(): string {
        return this._name
    }
    get email(): string {
        return this._email
    }
    get street(): string {
        return this._street
    }
    get number(): string {
        return this._number
    }
    get city(): string {
        return this._city
    }
    get zipCode(): string {
        return this._zipCode
    }
    get state(): string {
        return this._state
    }
    get complement(): string {
        return this._complement
    }
    


}