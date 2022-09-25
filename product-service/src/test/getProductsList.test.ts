import { APIGatewayProxyEvent } from "aws-lambda";
import { getProductsList } from "@/functions";
import { products } from "@/mocks";

describe("getProductsList", () => {
  const mockEvent = {} as APIGatewayProxyEvent;

  it("should return products list", async () => {
    const result = await getProductsList(mockEvent);

    expect(result.body).toEqual(JSON.stringify(products));
    expect(result.statusCode).toEqual(200);
  });
});
