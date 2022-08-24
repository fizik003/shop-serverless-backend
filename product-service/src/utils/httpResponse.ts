import { StatusCode, defaultHeaders } from "@/consts";

interface IResponse {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
}

export class HttpResponse {
  private static createResponse = (
    statusCode: StatusCode,
    data: unknown
  ): IResponse => ({
    statusCode,
    headers: {
      ...defaultHeaders,
    },
    body: JSON.stringify(data),
  });

  static createErrorResponse(
    statusCode: StatusCode,
    message: string
  ): IResponse {
    return this.createResponse(statusCode, { message });
  }

  static createSuccessResponse(data: unknown): IResponse {
    return this.createResponse(StatusCode.Success, data);
  }
}
