import { Test, TestingModule } from '@nestjs/testing';
import { BlogService } from './blog.service';
import { getModelToken } from '@nestjs/mongoose';
import { Blog } from './schema/blog.schema';
import { Model, Types } from 'mongoose';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { Service } from 'src/common/services/service.common';

// Define a mock blog document
const mockBlog = {
  _id: new Types.ObjectId(),
  title: 'Test Blog',
  content: 'Test Content',
  authorId: new Types.ObjectId(),
  save: jest.fn().mockResolvedValue(this),
  toJSON: jest.fn().mockReturnValue(this),
};

// Define a mock blog model that mimics Mongoose's model behavior
const mockBlogModel = {
  new: jest.fn().mockImplementation((dto) => ({
    ...dto,
    _id: new Types.ObjectId(),
    save: jest.fn().mockResolvedValue(mockBlog),
    toJSON: jest.fn().mockReturnValue(mockBlog),
  })),
  create: jest.fn().mockResolvedValue(mockBlog),
  findById: jest.fn().mockResolvedValue(mockBlog),
  findByIdAndUpdate: jest.fn().mockResolvedValue(mockBlog),
  findByIdAndRemove: jest.fn().mockResolvedValue(mockBlog),
  countDocuments: jest.fn().mockResolvedValue(1),
  estimatedDocumentCount: jest.fn().mockResolvedValue(1),
  insertMany: jest.fn().mockResolvedValue([mockBlog]),
  findOneAndUpdate: jest.fn().mockResolvedValue(mockBlog),
  updateMany: jest.fn().mockResolvedValue({ n: 1, nModified: 1, ok: 1 }),
  aggregate: jest.fn().mockResolvedValue([{ page: [{ totalIndex: 1, totalPage: 1 }], data: [mockBlog] }]),
  find: jest.fn().mockReturnThis(),
  sort: jest.fn().mockReturnThis(),
  skip: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  exec: jest.fn().mockResolvedValue([mockBlog]),
};

class MockCommonService<T> {
  createOne = jest.fn().mockResolvedValue(mockBlog);
  findOneById = jest.fn().mockResolvedValue(mockBlog);
}

describe('BlogService', () => {
  let service: BlogService;
  let model: Model<Blog>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogService,
        { provide: getModelToken(Blog.name), useValue: mockBlogModel },
        { provide: Service, useClass: MockCommonService },
      ],
    }).compile();

    service = module.get<BlogService>(BlogService);
    model = module.get<Model<Blog>>(getModelToken(Blog.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a blog', async () => {
      const createBlogDto = { title: 'Test Blog', content: 'Test Content', authorId: mockBlog.authorId };
      const result = await service.create(createBlogDto);
      expect(result).toEqual(mockBlog);
    });
  });

  describe('findOne', () => {
    it('should return a blog by id', async () => {
      const result = await service.findOne(mockBlog._id);
      expect(result).toEqual(mockBlog);
    });

    it('should throw NotFoundException if blog not found', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValueOnce(null);
      await expect(service.findOne(mockBlog._id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a blog by id', async () => {
      const updateBlogDto = { title: 'Updated Blog' };
      const result = await service.update(mockBlog._id, updateBlogDto);
      expect(result).toEqual(mockBlog);
    });

    it('should throw BadRequestException if update fails', async () => {
      jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValueOnce(null);
      await expect(service.update(mockBlog._id, { title: 'Updated Blog' })).rejects.toThrow(BadRequestException);
    });
  });

  describe('remove', () => {
    it('should remove a blog by id', async () => {
      const result = await service.remove(mockBlog._id);
      expect(result).toEqual(mockBlog);
    });

    it('should throw BadRequestException if delete fails', async () => {
      jest.spyOn(model, 'findOneAndUpdate').mockResolvedValueOnce(null);
      await expect(service.remove(mockBlog._id)).rejects.toThrow(BadRequestException);
    });
  });
});
