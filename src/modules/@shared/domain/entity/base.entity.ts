import Id from "../value_object/ide.value_object";

export default class BaseEntity {

    private _id: Id;
    private _createdAt: Date;
    private _updatedAt: Date;

    constructor(id?: Id) {
        this._id = id
        this._createdAt = new Date();
        this._updatedAt = new Date();
    }

    get id(): Id {
        return this._id;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }

    set createdAt(value: Date) {
        this._createdAt = value;
        this._updatedAt = new Date();
    }

    set updatedAt(value: Date) {
        this._updatedAt = value;
    }
}