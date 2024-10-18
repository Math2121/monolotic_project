import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import Client from "../../domain/entity";
import ClientGateway from "../../gateway/client.gateway";

export default class FindClientUseCase implements UseCaseInterface {
    constructor(private _clientRepository: ClientGateway) { }
    async execute(input: any): Promise<Client> {
        return this._clientRepository.find(input.id);
    }

}