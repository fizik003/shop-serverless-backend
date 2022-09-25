import Ajv from "ajv";
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { HttpResponse } from "@/utils";
import { StatusCode } from "@/consts/statusCode";
import { ProductProvider } from "@/providers";
import { ProductData } from "@/models";
import { CreateProductRequest } from "@/schemes";

const validate = new Ajv().compile(CreateProductRequest);

export const createProduct =
  (productProvider: ProductProvider) =>
  async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    console.log("Function invocation with:", JSON.stringify(event));

    let productData: ProductData;

    try {
      if (!event.body) {
        throw new Error();
      }

      productData = JSON.parse(event.body) as ProductData;
      const isValidData = validate(productData);

      if (!isValidData) {
        throw new Error();
      }
    } catch (error) {
      return HttpResponse.createErrorResponse(
        StatusCode.BadRequest,
        "Bad product data"
      );
    }

    try {
      const product = await productProvider.createProduct(productData);
      console.log("product created:", JSON.stringify(product));
      return HttpResponse.createSuccessResponse(product);
    } catch (error) {
      console.log("An error occured while creating the product", error);
      return HttpResponse.createErrorResponse(
        StatusCode.ServerError,
        "Error while creating the product"
      );
    }
  };
