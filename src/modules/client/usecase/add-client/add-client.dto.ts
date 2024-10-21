export default interface AddClientInputDto {
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


export default interface AddClientOutputDto {
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