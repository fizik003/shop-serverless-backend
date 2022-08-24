import { APIGatewayProxyEvent } from "aws-lambda";
import { getProductById } from "@/functions";

describe("getProductById", () => {
  it("should return product by id", async () => {
    const mockEvent = {
      pathParameters: {
        productId: "7567ec4b-b10c-48c5-9345-fc73c48a80a3",
      },
    } as unknown as APIGatewayProxyEvent;

    const result = await getProductById(mockEvent);

    expect(result).toEqual({
      body: JSON.stringify({
        description: "Short Product Description2",
        id: "7567ec4b-b10c-48c5-9345-fc73c48a80a3",
        price: 23,
        title: "Product",
      }),
      headers: {
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Origin": "*",
      },
      statusCode: 200,
    });
  });

  it("should return 400 error if productId is not exist", async () => {
    const mockEvent = {
      pathParameters: null,
    } as unknown as APIGatewayProxyEvent;

    const result = await getProductById(mockEvent);

    expect(result.statusCode).toEqual(400);
  });

  it("should return 404 error if product id is wrong", async () => {
    const mockEvent = {
      pathParameters: {
        productId: "fdsfsf",
      },
    } as unknown as APIGatewayProxyEvent;

    const result = await getProductById(mockEvent);

    expect(result.statusCode).toEqual(404);
  });
});
