import Client from "../entity";

export default interface ClientGateway {
    add(client: Client): Promise<void>
    find(id: string): Promise<Client>
}