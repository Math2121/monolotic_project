export default interface AddClientFacadeInputDto {
    name: string;
    email: string;
    address: string;
}

export default interface AddClientFacadeOutputDto {
    id: string;
    name: string;
    email: string;
    address: string;
}
export interface FindClientFacadeInputDto {
    id: string
}

export interface FindClientFacadeOutputDto {
    id: string;
    name: string;
    email: string;
    address: string;
}

export interface ClientFacadeInterface {
    add(input: AddClientFacadeInputDto): Promise<void>
    find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto>
}