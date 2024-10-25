import express, { Request, Response } from "express";
import AddClientUseCase from "../../modules/client/usecase/add-client/add-client.usecase";
import ClientRepository from "../../modules/client/gateway/repository/client.repository";
import FindClientUseCase from "../../modules/client/usecase/find-client/find-client.usecase";
import Id from "../../modules/@shared/domain/value_object/ide.value_object";

export const clientRoute = express.Router();

clientRoute.post("/", async (req: Request, res: Response) => {
    const usecase = new AddClientUseCase(new ClientRepository());
    try {
        const clientDto = {
            id: new Id(req.body.id).id,
            name: req.body.name,
            email: req.body.email,
            document: req.body.document,
            street: req.body.street,
            number: req.body.number,
            city: req.body.city,
            zipCode: req.body.zipCode,
            state: req.body.state,
            complement: req.body.complement

        };
        const output = await usecase.execute(clientDto);
        res.send(output);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});
