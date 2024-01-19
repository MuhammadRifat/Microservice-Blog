import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, HttpException, Query, UploadedFiles } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { MongoIdParams, IPaginate } from 'src/common/dto.common';
import { ImageLibraryService } from './image-library.service';

@Controller('image-library')
export class ImageLibraryController {
  constructor(private readonly imageLibraryService: ImageLibraryService) { }

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async create(@UploadedFiles() images: Express.Multer.File[]) {
    try {
      const data = await this.imageLibraryService.upload(images);

      return {
        success: true,
        data
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get()
  async findAll(@Query() paginate: IPaginate) {
    try {
      return await this.imageLibraryService.findAll(paginate);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get(':id')
  async findOne(@Param() { id }: MongoIdParams) {
    try {
      const data = await this.imageLibraryService.findOne(id);

      return {
        success: true,
        data
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete(':id')
  async remove(@Param() { id }: MongoIdParams) {
    try {
      const data = await this.imageLibraryService.remove(id);

      return {
        success: true,
        data
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}