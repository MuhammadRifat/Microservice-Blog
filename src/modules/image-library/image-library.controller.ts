import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, HttpException, Query, UploadedFiles, UseGuards } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { IPaginate, MongoIdParams } from 'src/common/dtos/dto.common';
import { FileLibraryService } from './image-library.service';
import { UserAuthGuard } from 'src/common/guards/user-auth.guard';

@Controller('file')
export class ImageLibraryController {
  constructor(private readonly fileLibraryService: FileLibraryService) { }

  @Post('image')
  @UseGuards(UserAuthGuard)
  @UseInterceptors(AnyFilesInterceptor())
  async create(@UploadedFiles() images: Express.Multer.File[]) {
    try {
      const data = await this.fileLibraryService.uploadImages(images);

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
      return await this.fileLibraryService.findAll(paginate);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get(':id')
  async findOne(@Param() { id }: MongoIdParams) {
    try {
      const data = await this.fileLibraryService.findOne(id);

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
      const data = await this.fileLibraryService.remove(id);

      return {
        success: true,
        data
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}