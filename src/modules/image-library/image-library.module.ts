import { Module } from '@nestjs/common';
import { FileLibraryService } from './image-library.service';
import { ImageLibraryController } from './image-library.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FileLibrary, FileLibrarySchema } from './schema/image-library.schema';
import { S3Service } from '../s3/s3.service';
import { RabbitmqModule } from 'src/rabbitmq/rabbitmq.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: FileLibrary.name, schema: FileLibrarySchema }]),
    RabbitmqModule
  ],
  controllers: [ImageLibraryController],
  providers: [FileLibraryService, S3Service],
})
export class ImageLibraryModule { }
