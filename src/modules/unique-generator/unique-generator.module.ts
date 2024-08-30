import { Module } from '@nestjs/common';
import { UniqueGeneratorService } from './unique-generator.service';
import { UniqueGeneratorController } from './unique-generator.controller';

@Module({
  controllers: [UniqueGeneratorController],
  providers: [UniqueGeneratorService],
})
export class UniqueGeneratorModule {}
