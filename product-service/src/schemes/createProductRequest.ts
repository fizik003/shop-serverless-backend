import { JSONSchemaType } from "ajv";
import { ProductData } from "@/models";

export const CreateProductRequest: JSONSchemaType<ProductData> = {
  type: "object",
  properties: {
    title: { type: "string" },
    description: { type: "string" },
    price: { type: "number" },
  },
  required: ["title", "description", "price"],
};
