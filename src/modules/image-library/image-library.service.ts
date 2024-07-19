import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { randomInt } from 'crypto';
import { Model, Types } from 'mongoose';
import { IPaginate } from 'src/common/dtos/dto.common';
import * as sharp from 'sharp';
import { parse } from 'path';
import { Service } from 'src/common/services/service.common';
import { InjectModel } from '@nestjs/mongoose';
import { S3Service } from '../s3/s3.service';
import { FileLibrary } from './schema/image-library.schema';
import { IUploadImage } from '../s3/dto/s3.dto';

@Injectable()
export class FileLibraryService extends Service<FileLibrary> {
  private THUMBNAIL = { width: 200, height: 200 };
  private PREVIEW = { width: 640, height: 480 };

  constructor(
    @InjectModel(FileLibrary.name) private imageLibraryModel: Model<FileLibrary>,
    private readonly s3Service: S3Service
  ) {
    super(imageLibraryModel);
  }

  // create new image
  async uploadImages(images: Express.Multer.File[], userId: number = null) {

    if (!images || !images.length) {
      throw new BadRequestException('image required');
    }

    // get original images
    const originalImages = images.map(async (image) => {
      const originalName = parse(image.originalname).name;
      const extension = parse(image.originalname).ext;
      const fileName = this.fileNameGenerator(originalName, extension);

      // const originalBuffer = await sharp(image.buffer)
      //   .webp({ effort: 3 })
      //   .toBuffer();

      return {
        fieldName: image.fieldname,
        fileName: fileName,
        buffer: image.buffer,
        mimetype: image.mimetype,
        size: image.size
      };
    });
    const originalResolvedImages = await Promise.all(originalImages);

    // convert image to preview and thumbnail
    // const previewResolvedImages = await this.convertImageForPreview(originalResolvedImages);
    // const thumbnailResolvedImages = await this.convertImageFroThumbnail(originalResolvedImages);

    const originalUploadPromise = this.s3Service.uploadMultipleImages(originalResolvedImages, process.env.IMG_ORIGINAL || 'original');
    // const previewUploadPromise = this.s3Service.uploadMultipleFiles(previewResolvedImages, process.env.IMG_PREVIEW || 'preview');
    // const thumbnailUploadPromise = this.s3Service.uploadMultipleFiles(thumbnailResolvedImages, process.env.IMG_THUMBNAIL || 'thumbnail');

    // const [uploadedImages] = await Promise.all([originalUploadPromise, previewUploadPromise, thumbnailUploadPromise]);
    const [uploadedImages] = await Promise.all([originalUploadPromise]);

    const imageNames = [];
    const response = uploadedImages.map(image => {
      imageNames.push({ name: image.fileName, userId, mimetype: image.mimetype, size: image.size, directory: image.directory });
      return { fileName: image.fileName, fieldName: image.fieldName };
    });

    // save to database
    await this.createMany(imageNames);
    return response;
  }

  private async convertImageForPreview(originalResolvedImages: IUploadImage[]) {
    // resize to previews
    const previewImages = originalResolvedImages.map(async (image) => {

      const previewBuffer = await sharp(image.buffer)
        .resize(this.PREVIEW.width, this.PREVIEW.height)
        .webp({ effort: 3 })
        .toBuffer();

      return { ...image, buffer: previewBuffer };
    });

    return await Promise.all(previewImages);
  }

  private async convertImageFroThumbnail(originalResolvedImages: IUploadImage[]) {
    // resize to thumbnails
    const thumbnailImages = originalResolvedImages.map(async (image) => {

      const thumbnailBuffer = await sharp(image.buffer)
        .resize(this.THUMBNAIL.width, this.THUMBNAIL.height)
        .webp({ effort: 3 })
        .toBuffer();

      return { ...image, buffer: thumbnailBuffer };
    });

    return await Promise.all(thumbnailImages);
  }
  // get all image
  async findAll(paginate: IPaginate) {
    return await this.findByPaginate({}, paginate);
  }

  // find image by id
  async findOne(id: Types.ObjectId) {
    const data = await this.findOneById(id);

    if (!data) {
      throw new NotFoundException('image not found');
    }

    return data;
  }

  // remove image by id
  async remove(id: Types.ObjectId) {
    const image = await this.removeById(id);

    if (!image) {
      throw new NotFoundException('image not found');
    }

    await Promise.all([this.s3Service.deleteFile(image.name, process.env.IMG_ORIGINAL || 'original'),
    this.s3Service.deleteFile(image.name, process.env.IMG_PREVIEW || 'preview'),
    this.s3Service.deleteFile(image.name, process.env.IMG_THUMBNAIL || 'thumbnail')
    ]);

    return image;
  }

  // replace space to underscore
  private fileNameGenerator = (originalName: string, extension: string) => {
    const fileName = originalName
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "_")
      .replace(/^-+|-+$/g, "");

    return new Date().getTime().toString() + randomInt(11111111, 99999999).toString() + '_' + fileName + extension;
  };
}
