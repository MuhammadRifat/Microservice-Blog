import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, blogSchema } from './schema/blog.schema';
import { RabbitmqModule } from 'src/rabbitmq/rabbitmq.module';
import { BlogListenerController } from './blog-listener.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: blogSchema }]),
    RabbitmqModule
  ],
  controllers: [BlogController, BlogListenerController],
  providers: [BlogService],
  exports: [BlogService]
})
export class BlogModule { }
