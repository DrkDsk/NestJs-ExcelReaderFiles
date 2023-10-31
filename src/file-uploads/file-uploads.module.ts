import { Module } from '@nestjs/common';
import { FileUploadsService } from './file-uploads.service';
import { FileUploadsController } from './file-uploads.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  providers: [FileUploadsService],
  controllers: [FileUploadsController],
})
export class FileUploadsModule {}
