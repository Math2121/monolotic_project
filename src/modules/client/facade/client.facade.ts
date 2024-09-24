import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import AddClientFacadeInputDto, { ClientFacadeInterface, FindClientFacadeInputDto, FindClientFacadeOutputDto } from "./client.facade.interface";

export type UseCaseProps = {
    addUseCase: UseCaseInterface;  
    findUseCase:UseCaseInterface
}
export default class ClientFacade implements ClientFacadeInterface{
    private _addUseCase: UseCaseInterface
    private _findUseCase: UseCaseInterface;  

    constructor(props: UseCaseProps) {
        this._addUseCase = props.addUseCase;
        this._findUseCase = props.findUseCase;
    }


    async add(input: AddClientFacadeInputDto): Promise<void> {
      await this._addUseCase.execute(input);
        
    }
    async find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto> {
        return await this._findUseCase.execute(input);
    }
    
}