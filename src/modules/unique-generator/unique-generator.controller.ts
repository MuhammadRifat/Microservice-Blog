import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UniqueGeneratorService } from './unique-generator.service';
import { CreateUniqueGeneratorDto } from './dto/create-unique-generator.dto';
import { UpdateUniqueGeneratorDto } from './dto/update-unique-generator.dto';

@Controller('unique-generator')
export class UniqueGeneratorController {
  constructor(private readonly uniqueGeneratorService: UniqueGeneratorService) {}

  @Post()
  create(@Body() createUniqueGeneratorDto: CreateUniqueGeneratorDto) {
    return this.uniqueGeneratorService.create(createUniqueGeneratorDto);
  }

  @Get()
  findAll() {
    return this.uniqueGeneratorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uniqueGeneratorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUniqueGeneratorDto: UpdateUniqueGeneratorDto) {
    return this.uniqueGeneratorService.update(+id, updateUniqueGeneratorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uniqueGeneratorService.remove(+id);
  }
}
