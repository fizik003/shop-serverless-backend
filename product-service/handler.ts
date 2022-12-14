import { DynamoDB } from "aws-sdk";
import * as handlers from "@/functions";
import { ProductProvider } from "@/providers";

console.log(process.env);

const { IS_OFFLINE, PRODUCTS_TABLE_NAME = "" } = process.env;
console.log("is offline", IS_OFFLINE);

const dbOfflineOptions = {
  region: "localhost",
  endpoint: "http://localhost:8000",
  accessKeyId: "DEFAULT_ACCESS_KEY",
  secretAccessKey: "DEFAULT_SECRET",
};

const dbClient = IS_OFFLINE
  ? new DynamoDB.DocumentClient(dbOfflineOptions)
  : new DynamoDB.DocumentClient();

const productProvider = new ProductProvider(dbClient, PRODUCTS_TABLE_NAME);

export const createProduct = handlers.createProduct(productProvider);
export const getProductsList = handlers.getProductsList(productProvider);
export const getProductById = handlers.getProductById(productProvider);
