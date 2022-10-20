import { S3Client } from '@aws-sdk/client-s3';

import { ImportService } from '@/services/importService';
import { FileParse } from '@/services/fileParserService';

import { Product } from '@/models';
import * as handlers from '@/functions';

const { BUCKET_REGION, BUCKET_NAME } = process.env;

const s3Client = new S3Client({ region: BUCKET_REGION });
const productFileParser = new FileParse<Product>();

const productImportService = new ImportService<Product>(
  BUCKET_NAME as string,
  s3Client,
  productFileParser
);

export const importProductsFile = handlers.importProductsFile(productImportService);
export const importFileParser = handlers.importFileParser(productImportService);
