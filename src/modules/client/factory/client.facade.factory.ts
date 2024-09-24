import ClientFacade from "../facade/client.facade"
import ClientRepository from "../gateway/repository/client.repository"
import AddClientUseCase from "../usecase/add-client/add-client.usecase"
import FindClientUseCase from "../usecase/find-client/find-client.usecase"

export default class ClientFacadeFactory { 
    static create() {
        const repository = new ClientRepository()
        const addUseCase = new AddClientUseCase(repository)
        const findUseCase = new FindClientUseCase(repository)
        const facade = new ClientFacade({
            addUseCase: addUseCase,
            findUseCase: findUseCase
        })


        return facade
    }
}