import { PlaceOrderInputDto } from "./place-order.dto"
import PlaceOrderUseCase from "./place-order.usecase"

describe("Place Order UseCase test", () => {
    describe("Validate products method", () => {
        //@ts-expect-error - no params in constructor
        const placeOrderUseCase = new PlaceOrderUseCase()
        it("should throw an error if no product is found", () => {
            const input: PlaceOrderInputDto = {
                clientId: "0",
                products: []
            }
            expect(() => placeOrderUseCase["validateProducts"](input)).rejects.toThrow(
                new Error("No product selected")
            )
        })

        it("should throw an error when product is out of stock", async () => {
            const mockProductFacade = {
                checkStock: jest.fn(({ productID }: { productID: string }) => Promise.resolve({
                    productID,
                    stock: productID === "1" ? 0 : 1
                }))
            }
            //@ts-expect-error - no params in constructor
            placeOrderUseCase["_productFacade"] = mockProductFacade

            let input: PlaceOrderInputDto = {
                clientId: "0",
                products: [
                    { productId: "1" }
                ]
            }

            await expect(placeOrderUseCase["validateProducts"](input)).rejects.toThrow(new Error("Product 1 is not available in stock"))

            input = {
                clientId: "0",
                products: [{
                    productId: "0"
                }, {
                    productId: "1"
                }]
            }

            await expect(placeOrderUseCase["validateProducts"](input)).rejects.toThrow(new Error("Product 1 is not available in stock"))

            input = {
                clientId: "0",
                products: [{
                    productId: "1"
                }, {
                    productId: "2"
                }]
            }

            await expect(placeOrderUseCase["validateProducts"](input)).rejects.toThrow(new Error("Product 1 is not available in stock"))

        })

    })
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