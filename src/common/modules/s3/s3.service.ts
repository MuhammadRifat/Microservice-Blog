import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { IUploadImage } from './dto/s3.dto';
import { writeFile } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class S3Service {

    private AWS_S3_BUCKET: string;
    private s3: AWS.S3;

    constructor() {
        this.AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
        this.s3 = new AWS.S3({
            accessKeyId: process.env.AWS_S3_ACCESS_KEY,
            secretAccessKey: process.env.AWS_S3_KEY_SECRET,
        });
    }

    // upload single image
    async uploadSingleFile(image: IUploadImage, directory: string) {
        try {
            const params = {
                Bucket: this.AWS_S3_BUCKET,
                Key: `${directory}/${image.fileName}`,
                Body: image.buffer,
                // ACL: 'public-read',
                // ContentType: file.mimetype,
                ContentDisposition: 'inline',
                CreateBucketConfiguration: {
                    LocationConstraint: process.env.AWS_S3_REGION,
                },
            };
            await this.s3.upload(params).promise();

            return image;
        } catch (error) {
            throw new Error(error);
        }
    }

    // multiple image uploaded
    async uploadMultipleFiles(images: IUploadImage[], directory: string) {
        try {
            images.map(async (image) => {
                const params = {
                    Bucket: this.AWS_S3_BUCKET,
                    Key: `${directory}/${image.fileName}`,
                    Body: image.buffer,
                    ContentDisposition: 'inline',
                    CreateBucketConfiguration: {
                        LocationConstraint: process.env.AWS_S3_REGION,
                    },
                };
                // const data = await this.s3.upload(params).promise();

                // upload on file system
                const mainDirectory = join('public', 'uploads', directory, image.fileName);
                const data = await writeFile(mainDirectory, image.buffer);
            });

            return images;
        } catch (error) {
            throw new Error(error);
        }
    }

    // delete file from s3 bucket
    async deleteFile(imageName: string, directory: string) {
        try {
            return await this.s3
                .deleteObject({
                    Bucket: this.AWS_S3_BUCKET,
                    Key: `${directory}/${imageName}`,
                })
                .promise();
        } catch (error) {
            throw new Error(error);
        }
    }
}