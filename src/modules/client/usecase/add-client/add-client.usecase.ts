
import Id from "../../../@shared/domain/value_object/ide.value_object";
import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import Client from "../../domain/entity";
import ClientGateway from "../../gateway/client.gateway";
import AddClientInputDto from "./add-client.dto";

export default class AddClientUseCase implements UseCaseInterface {
    constructor(private _clientRepository: ClientGateway){}
    async execute(input: AddClientInputDto): Promise<void> {

        const id = new Id(input.id)
        const client = new Client({
            name: input.name,
            email: input.email,
            city: input.city,
            street: input.street,
            number: input.number,
            zipCode: input.zipCode,
            state: input.state,
            complement: input.complement,
            document: input.document,
            id
        });
        await this._clientRepository.add(client);


    }

}