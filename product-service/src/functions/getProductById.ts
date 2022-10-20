import { HttpResponse } from "./../utils/httpResponse";
import { APIGatewayProxyResult, APIGatewayProxyEvent } from "aws-lambda";
import { StatusCode } from "@/consts";
import { ProductProvider } from "@/providers";

export const getProductById =
  (productProvider: ProductProvider) =>
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log(`Function start with event: ${event}`);

    const productId = event.pathParameters?.productId;

    if (!productId) {
      return HttpResponse.createErrorResponse(
        StatusCode.BadRequest,
        "productId is not valid"
      );
    }

    try {
      const product = await productProvider.getProductById(productId);
      if (!product) {
        return HttpResponse.createErrorResponse(
          StatusCode.NotFound,
          "product not found"
        );
      }

      return HttpResponse.createSuccessResponse(product);
    } catch (error) {
      return HttpResponse.createErrorResponse(
        StatusCode.ServerError,
        "something went wrong"
      );
    }
  };
