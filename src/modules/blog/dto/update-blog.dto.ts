import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogDto } from './create-blog.dto';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { BLOG_STATUS } from '../enums/blog.enum';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {

    @IsOptional()
    @IsEnum(BLOG_STATUS)
    status?: BLOG_STATUS;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
