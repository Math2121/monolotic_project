
import Id from "../../../@shared/domain/value_object/ide.value_object";
import Client from "../../domain/entity";
import ClientGateway from "../client.gateway"
import { ClientModel } from "./client.model";

export default class ClientRepository implements ClientGateway {
    async add(client: Client): Promise<void> {
        await ClientModel.create({
            id: client.id.id,
            name: client.name,
            email: client.email,
            document: client.document,
            street: client.street,
            city: client.city,
            state: client.state,
            number: client.number,
            zipCode: client.zipCode,
            complement: client.complement,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt,
        })
    }
    async find(id: string): Promise<Client> {
        const client = await ClientModel.findOne({
            where: { id }
        });
        if (!client) {
            throw new Error(`Client with id ${id} not found`);
        }
 
        return new Client({
            id: new Id(client.get("id")),
            name: client.get("name"),
            email: client.get("email"),
            document: client.get("document"),
            street: client.get("street"),
            city: client.get("city"),
            state: client.get("state"),
            number: client.get("number"),
            zipCode: client.get("zipCode"),
            complement: client.get("complement"),

        });
    }


}