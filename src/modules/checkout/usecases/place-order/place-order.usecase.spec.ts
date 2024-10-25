import { UpdatedAt } from "sequelize-typescript"
import Id from "../../../@shared/domain/value_object/ide.value_object"
import Client from "../../domain/client.entity"
import Product from "../../domain/product.entity"
import { PlaceOrderInputDto } from "./place-order.dto"
import PlaceOrderUseCase from "./place-order.usecase"
const mockDate = new Date(2000, 1, 1)
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
                    { productID: "1" }
                ]
            }

            await expect(placeOrderUseCase["validateProducts"](input)).rejects.toThrow(new Error("Product 1 is not available in stock"))

            input = {
                clientId: "0",
                products: [{
                    productID: "0"
                }, {
                    productID: "1"
                }]
            }

            await expect(placeOrderUseCase["validateProducts"](input)).rejects.toThrow(new Error("Product 1 is not available in stock"))

            input = {
                clientId: "0",
                products: [{
                    productID: "1"
                }, {
                    productID: "2"
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
        describe("Place order", () => {

            const clientProps = {
                id: "1c",
                name: "John Doe",
                email: "johndoe@example.com",
                document: "000",
                number: "1",
                complement: "",
                city: "same city",
                state: "some state",
                zipCode: "12345",
            }

            const mockClientFacade = {
                find: jest.fn().mockResolvedValue(clientProps)
            }

            const mockPaymnetFacade = {
                process: jest.fn()
            }
            const mockCheckoutRepo = {
                addOrder: jest.fn()
            }

            const mockInvoice = {
                generateInvoice: jest.fn().mockResolvedValue({ id: "1c" })
            }

            const placeOrderUseCase = new PlaceOrderUseCase(
                mockClientFacade as any,
                null,
                null,
                mockCheckoutRepo as any,
                mockInvoice as any,
                mockPaymnetFacade
            )

            const products = {
                "1": new Product({
                    id: new Id("1"),
                    name: "Product 1",
                    description: "Product 1 description",
                    salesPrice: 10
                }),
                "2": new Product({
                    id: new Id("2"),
                    name: "Product 2",
                    description: "Product 2 description",
                    salesPrice: 20
                })
            }

            const mockValdiateProducts = jest
                //@ts-expect-error - spy on private method
                .spyOn(placeOrderUseCase, "validateProducts")
                //@ts-expect-error - spy on private method
                .mockResolvedValue(null)

            const mokcGetProduct = jest
                //@ts-expect-error - spy on private method
                .spyOn(placeOrderUseCase, "getProduct")
                //@ts-expect-error - no return value
                .mockImplementation((productId: keyof typeof products) => {
                    return products[productId]
                })

            it("should not to be approved", async () => {

                mockPaymnetFacade.process = mockPaymnetFacade.process.mockReturnValue({
                    transactionId: "1c",
                    status: "error",
                    orderId: "1o",
                    amount: 100,
                    createdAt: new Date(),
                    UpdatedAt: new Date(),
                })

                const input = {
                    clientId: "1c",
                    products: [{ productID: "1" }, { productID: "2" }]
                }

                let output = await placeOrderUseCase.execute(input)

                expect(output.invoiceId).toBeNull()
                expect(output.total).toBe(30)

                expect(mockClientFacade.find).toHaveBeenCalled()

            })

            it("should  be approved", async () => {

                mockPaymnetFacade.process = mockPaymnetFacade.process.mockReturnValue({
                    transactionId: "1c",
                    status: "approved",
                    orderId: "1o",
                    amount: 100,
                    createdAt: new Date(),
                    UpdatedAt: new Date(),
                })

                const input = {
                    clientId: "1c",
                    products: [{ productID: "1" }, { productID: "2" }]
                }

                let output = await placeOrderUseCase.execute(input)

                expect(output.invoiceId).toBe("1c")
                expect(output.total).toBe(30)
                expect(mockClientFacade.find).toHaveBeenCalled()

            })

        })

    })

    describe("getProducts", () => {
        beforeAll(() => {
            jest.useFakeTimers("modern")
            jest.setSystemTime(mockDate)
        })
        afterAll(() => {
            jest.useRealTimers()
        })
        //@ts-expect-error - no params in constructor
        const placeOrderUseCase = new PlaceOrderUseCase()
        it("should throw an error when product not found", async () => {
            const mockCatalogueFacade = {
                find: jest.fn().mockResolvedValue(null)
            }

            //@ts-expect-error - no params in constructor
            placeOrderUseCase["_catalogueFacade"] = mockCatalogueFacade

            await expect(placeOrderUseCase["getProduct"]("0")).rejects.toThrow(new Error("Product not found"))



        })
        it("should return a product", async () => {
            const mockCatalogueFacade = {
                find: jest.fn().mockResolvedValue({
                    id: "0",
                    name: "Test Product",
                    salesPrice: 0,
                    description: "Product 0 description"
                })
            }
            //@ts-expect-error - no params in constructor
            placeOrderUseCase["_catalogueFacade"] = mockCatalogueFacade

            await expect(placeOrderUseCase["getProduct"]("0")).resolves.toEqual(new Product({
                id: new Id("0"),
                name: "Test Product",
                salesPrice: 0,
                description: "Product 0 description"
            }))
            expect(mockCatalogueFacade.find).toHaveBeenCalledTimes(1)
        })
    })
})