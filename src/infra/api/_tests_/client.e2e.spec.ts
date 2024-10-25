
import request from 'supertest'
import { app, sequelize } from '../../express';


describe('E2E test for client', () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should create a client', async () => {
        const response = await request(app)
            .post('/clients')
            .send({
                "id": "1c",
                "name": "jose",
                "email": "email@email",
                "document": "123",
                "street": "street",
                "number": "123",
                "city": "city",
                "zipCode": "zipCode",
                "state": "state",
                "complement": "complement"

            });
        expect(response.status).toBe(200);

    });
});