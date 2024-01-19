import { PartialType } from '@nestjs/mapped-types';
import { CreateImageLibraryDto } from './create-image-library.dto';

export class UpdateImageLibraryDto extends PartialType(CreateImageLibraryDto) {}
