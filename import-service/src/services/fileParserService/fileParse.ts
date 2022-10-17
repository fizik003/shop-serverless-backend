import csv from 'csv-parser';
import { Readable } from 'stream';

export class FileParse<T> {
  parseFileStream(fileStream: Readable): Promise<T[]> {
    const parseData: T[] = [];

    return new Promise((resolve, reject) => {
      fileStream
        .pipe(csv())
        .on('error', () => reject('Error while parsing the stream'))
        .on('data', (item) => parseData.push(item as T))
        .on('end', () => resolve(parseData));
    });
  }
}
