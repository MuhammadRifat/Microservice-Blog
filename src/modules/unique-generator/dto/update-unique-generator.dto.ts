import { PartialType } from '@nestjs/swagger';
import { CreateUniqueGeneratorDto } from './create-unique-generator.dto';

export class UpdateUniqueGeneratorDto extends PartialType(CreateUniqueGeneratorDto) {}
