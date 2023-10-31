import { Injectable } from '@nestjs/common';
import * as xlsx from 'xlsx';

@Injectable()
export class FileUploadsService {
  async readFile(file: Express.Multer.File) {
    return new Promise((resolve, reject) => {
      try {
        const workbook = xlsx.readFile(file.path);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const data = xlsx.utils.sheet_to_json(sheet);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
}
