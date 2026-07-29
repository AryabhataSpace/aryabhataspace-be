import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentsModule } from './documents/documents.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [DocumentsModule, PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
