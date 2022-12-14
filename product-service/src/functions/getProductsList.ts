import { HttpResponse } from "./../utils/httpResponse";
import { APIGatewayProxyResult } from "aws-lambda";
import { StatusCode } from "@/consts";
import { ProductProvider } from "@/providers";

export const getProductsList =
  (productProvider: ProductProvider) =>
  async (event): Promise<APIGatewayProxyResult> => {
    console.log(`Lambda start with event: ${JSON.stringify(event)}`);
    try {
      const products = await productProvider.getProducts();
      console.log(`products: ${products}`);
      return HttpResponse.createSuccessResponse(products);
    } catch (error) {
      console.log(`An error which appears while loading products: ${error}`);
      return HttpResponse.createErrorResponse(
        StatusCode.ServerError,
        "Something went wrong"
      );
    }
  };
