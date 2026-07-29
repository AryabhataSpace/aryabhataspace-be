import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';

export interface DocumentRecord {
  id: string;
  filename: string;
  size: number;
  type: string;
  category: string;
  uploadDate: string;
}

@Injectable()
export class DocumentsService {
  private documents: DocumentRecord[] = [];

  uploadDocument(file: Express.Multer.File, category: string): DocumentRecord {
    // Dummy in-memory storage approach: 
    // Discard actual file binary and just store metadata
    const newDoc: DocumentRecord = {
      id: randomUUID(),
      filename: file.originalname,
      size: file.size,
      type: file.mimetype,
      category: category || 'UNKNOWN',
      uploadDate: new Date().toISOString(),
    };
    
    this.documents.push(newDoc);
    return newDoc;
  }

  getDocuments(): DocumentRecord[] {
    return this.documents;
  }

  deleteDocument(id: string): void {
    const idx = this.documents.findIndex(d => d.id === id);
    if (idx === -1) {
      throw new NotFoundException(`Document with id ${id} not found`);
    }
    this.documents.splice(idx, 1);
  }
}
