import { PlaceOrderInputDto } from "./place-order.dto"
import PlaceOrderUseCase from "./place-order.usecase"

describe("Place Order UseCase test", () => {
    describe("execute method", () => {
        it("should throw an error when client not found", async () => {
            const mockClientFacade = {
                find: jest.fn().mockResolvedValue(null)
            }
            //@ts-expect-error - no params in constructor
            const placeOrderUseCase = new PlaceOrderUseCase()
            //@ts-expect-error - force set clientFacade
            placeOrderUseCase["_clientFacade"] = mockClientFacade

            const input: PlaceOrderInputDto = {
                clientId: "0",
                products: []
            }
            await expect(placeOrderUseCase.execute(input)).rejects.toThrow(
                new Error("Client not found")
            )
        })
        it("should throw an error when product are not valid", async () => {
            const mockClientFacade = {
                find: jest.fn().mockResolvedValue(true)
            }
            //@ts-expect-error - no params in constructor
            const placeOrderUseCase = new PlaceOrderUseCase()

            const mockValidateProducts = jest
                //@ts-expect-error - spy on private method
                .spyOn(placeOrderUseCase, "validateProducts")
                //@ts-expect-error - no return value
                .mockRejectedValue(new Error("No product selected"))


            //@ts-expect-error - force set clientFacade
            placeOrderUseCase["_clientFacade"] = mockClientFacade

            const input: PlaceOrderInputDto = {
                clientId: "0",
                products: []
            }
            await expect(placeOrderUseCase.execute(input)).rejects.toThrow(
                new Error("No product selected")
            )
            expect(mockValidateProducts).toHaveBeenCalledTimes(1)

        })
    })
})