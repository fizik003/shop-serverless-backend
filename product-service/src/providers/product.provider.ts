import { DynamoDB } from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import { Product, ProductData } from "@/models";

export class ProductProvider {
  private readonly dbClient: DynamoDB.DocumentClient;
  private readonly tableName: string;

  constructor(dbClient: DynamoDB.DocumentClient, tableName: string) {
    this.dbClient = dbClient;
    this.tableName = tableName;
  }

  async getProductById(id: string) {
    const params = {
      TableName: this.tableName,
      Key: { id },
    };

    const data = await this.dbClient.get(params).promise();
    return data.Item as Product;
  }

  async getProducts() {
    const params = {
      TableName: this.tableName,
    };

    const data = await this.dbClient.scan(params).promise();

    return data.Items as Product[];
  }

  async createProduct(productData: ProductData) {
    const product: Product = { ...productData, id: uuidv4() };
    const params = {
      TableName: this.tableName,
      Item: product,
    };

    await this.dbClient.put(params).promise();
    return product;
  }
}
