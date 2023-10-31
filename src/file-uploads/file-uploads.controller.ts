import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadsService } from './file-uploads.service';

@Controller('files')
export class FileUploadsController {
  constructor(private readonly fileUploadService: FileUploadsService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    this.fileUploadService.readFile(file).then((readedFile) => {
      console.log(readedFile);
    });

    return 'Archivo leído';
  }
}
