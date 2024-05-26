import { Test, TestingModule } from '@nestjs/testing';
import { ImageLibraryService } from './image-library.service';

describe('ImageLibraryService', () => {
  let service: ImageLibraryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImageLibraryService],
    }).compile();

    service = module.get<ImageLibraryService>(ImageLibraryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
