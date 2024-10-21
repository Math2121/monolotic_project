import Id from "../../@shared/domain/value_object/ide.value_object";

export default interface AddClientFacadeInputDto {
    name: string;
    email: string;
    city: string;
    complement: string;
    number: string;
    state: string;
    street: string;
    document: string;
    zipCode: string;
}



export interface FindClientFacadeInputDto {
    id: string
}

export interface FindClientFacadeOutputDto {
    id: Id;
    name: string;
    email: string;
    city: string;
    complement: string;
    number: string;
    state: string;
    street: string;
    document: string;
    createAt: Date;
    updateAt: Date;
    zipCode: string;
}

export interface ClientFacadeInterface {
    add(input: AddClientFacadeInputDto): Promise<void>
    find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto>
}