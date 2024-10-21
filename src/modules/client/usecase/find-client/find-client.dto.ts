export interface FindClientInputDto {
    id: string
}

export interface FindClientOutputDto {
    id: string;
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