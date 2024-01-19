import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateImageLibraryDto } from './dto/update-image-library.dto';
import { randomInt } from 'crypto';
import { Model, Types } from 'mongoose';
import { IPaginate } from 'src/common/dto.common';
import * as sharp from 'sharp';
import { parse } from 'path';
import { ImageLibrary } from './schema/image-library.schema';
import { Service } from 'src/common/service.common';
import { InjectModel } from '@nestjs/mongoose';
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export class ImageLibraryService extends Service<ImageLibrary> {
  private THUMBNAIL = { width: 200, height: 200 };
  private PREVIEW = { width: 640, height: 480 };

  constructor(
    @InjectModel(ImageLibrary.name) private imageLibraryModel: Model<ImageLibrary>,
    private readonly s3Service: S3Service
  ) {
    super(imageLibraryModel);
  }

  // create new image
  async upload(images: Express.Multer.File[]) {

    if (!images || !images.length) {
      throw new BadRequestException('image required');
    }

    // get original images
    const originalImages = images.map(async (image) => {
      const originalName = parse(image.originalname).name;
      const fileName = this.fileNameGenerator(originalName);

      const originalBuffer = await sharp(image.buffer)
        .webp({ effort: 3 })
        .toBuffer();

      return { fieldName: image.fieldname, fileName: fileName, buffer: originalBuffer };
    });
    const originalResolvedImages = await Promise.all(originalImages);

    // resize to previews
    const previewImages = originalResolvedImages.map(async (image) => {

      const previewBuffer = await sharp(image.buffer)
        .resize(this.PREVIEW.width, this.PREVIEW.height)
        .webp({ effort: 3 })
        .toBuffer();

      return { ...image, buffer: previewBuffer };
    });

    // resize to thumbnails
    const thumbnailImages = originalResolvedImages.map(async (image) => {

      const thumbnailBuffer = await sharp(image.buffer)
        .resize(this.THUMBNAIL.width, this.THUMBNAIL.height)
        .webp({ effort: 3 })
        .toBuffer();

      return { ...image, buffer: thumbnailBuffer };
    });

    const previewResolvedImages = await Promise.all(previewImages);
    const thumbnailResolvedImages = await Promise.all(thumbnailImages);

    const originalUploadPromise = this.s3Service.uploadMultipleFiles(originalResolvedImages, process.env.IMG_ORIGINAL || 'original');
    const previewUploadPromise = this.s3Service.uploadMultipleFiles(previewResolvedImages, process.env.IMG_PREVIEW || 'preview');
    const thumbnailUploadPromise = this.s3Service.uploadMultipleFiles(thumbnailResolvedImages, process.env.IMG_THUMBNAIL || 'thumbnail');

    const [uploadedImages] = await Promise.all([originalUploadPromise, previewUploadPromise, thumbnailUploadPromise]);

    const imageNames = [];
    const response = uploadedImages.map(image => {
      imageNames.push({ name: image.fileName });
      return { fileName: image.fileName, fieldName: image.fieldName };
    });

    // save to database
    await this.createMany(imageNames);
    return response;
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

  // update image
  async update(id: Types.ObjectId, updateImageDto: UpdateImageLibraryDto) {
    return await this.updateById(id, updateImageDto);
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
  private fileNameGenerator = (originalName: string) => {
    const fileName = originalName
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "_")
      .replace(/^-+|-+$/g, "");

    return Date.parse(new Date().toString()) + randomInt(11111111, 99999999).toString() + '_' + fileName + '.webp';
  };
}
