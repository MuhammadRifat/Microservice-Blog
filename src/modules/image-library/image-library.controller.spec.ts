import { Test, TestingModule } from '@nestjs/testing';
import { ImageLibraryController } from './image-library.controller';
import { ImageLibraryService } from './image-library.service';

describe('ImageLibraryController', () => {
  let controller: ImageLibraryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageLibraryController],
      providers: [ImageLibraryService],
    }).compile();

    controller = module.get<ImageLibraryController>(ImageLibraryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
