import { Controller, Get, Query } from '@nestjs/common';
import { UniqueGeneratorService } from './unique-generator.service';
import { CreateUniqueGeneratorDto } from './dto/create-unique-generator.dto';

@Controller('unique-generator')
export class UniqueGeneratorController {
  constructor(private readonly uniqueGeneratorService: UniqueGeneratorService) { }

  @Get()
  generateSequence(
    @Query() { start, end }: CreateUniqueGeneratorDto
  ) {
    return this.uniqueGeneratorService.generateSequence(+start, +end);
  }

  @Get('next')
  getNext() {
    return this.uniqueGeneratorService.getNext();
  }
}
