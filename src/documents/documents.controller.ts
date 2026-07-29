import { Controller, Post, Get, Delete, Param, UseInterceptors, UploadedFile, Body, ParseFilePipeBuilder, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentsService } from './documents.service';
import { UploadDocumentDto } from './dto/upload-document.dto';

@Controller('api/v1/candidate/documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadDocument(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({
          maxSize: 5 * 1024 * 1024 // 5MB
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
        }),
    ) file: Express.Multer.File,
    @Body() uploadDto: UploadDocumentDto,
  ) {
    return this.documentsService.uploadDocument(file, uploadDto.category);
  }

  @Get()
  getDocuments() {
    return this.documentsService.getDocuments();
  }

  @Delete(':id')
  deleteDocument(@Param('id') id: string) {
    this.documentsService.deleteDocument(id);
    return { success: true };
  }
}
