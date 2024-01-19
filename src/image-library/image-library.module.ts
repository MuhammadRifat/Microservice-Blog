import { Module } from '@nestjs/common';
import { ImageLibraryService } from './image-library.service';
import { ImageLibraryController } from './image-library.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageLibrary, imageLibrarySchema } from './schema/image-library.schema';
import { S3Service } from 'src/s3/s3.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: ImageLibrary.name, schema: imageLibrarySchema }])],
  controllers: [ImageLibraryController],
  providers: [ImageLibraryService, S3Service],
})
export class ImageLibraryModule { }
