import * as fs from 'fs';
import * as path from 'path';

export interface FileInfo {
  path: string;
  size: number;
  type: string;
  isLocal: boolean;
}

export class FileService {
  private static readonly MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
  private static readonly MAX_VIDEO_SIZE = 8 * 1024 * 1024; // 8MB
  private static readonly SUPPORTED_IMAGE_FORMATS = ['png', 'jpg', 'jpeg'];
  private static readonly SUPPORTED_VIDEO_FORMATS = ['mp4', 'mov', 'm4v'];

  static async processFile(imageSource: string): Promise<{ fileInfo: FileInfo; dataUrl?: string }> {
    if (!imageSource) {
      throw new Error('Image source is required');
    }

    const isUrl = imageSource.startsWith('http://') || imageSource.startsWith('https://');

    if (isUrl) {
      return {
        fileInfo: {
          path: imageSource,
          size: 0,
          type: this.getFileType(imageSource),
          isLocal: false,
        }
      };
    }

    const resolvedPath = path.resolve(imageSource);

    if (!fs.existsSync(resolvedPath)) {
      throw new Error(`File not found: ${resolvedPath}`);
    }

    const stats = await fs.promises.stat(resolvedPath);
    const fileSize = stats.size;
    const fileExtension = path.extname(resolvedPath).toLowerCase().slice(1);
    const fileType = this.getFileType(resolvedPath);

    if (this.SUPPORTED_IMAGE_FORMATS.includes(fileExtension)) {
      if (fileSize > this.MAX_IMAGE_SIZE) {
        throw new Error(`Image file too large. Maximum size is ${this.MAX_IMAGE_SIZE / 1024 / 1024}MB`);
      }
    } else if (this.SUPPORTED_VIDEO_FORMATS.includes(fileExtension)) {
      if (fileSize > this.MAX_VIDEO_SIZE) {
        throw new Error(`Video file too large. Maximum size is ${this.MAX_VIDEO_SIZE / 1024 / 1024}MB`);
      }
    } else {
      throw new Error(`Unsupported file format: ${fileExtension}`);
    }

    const fileBuffer = await fs.promises.readFile(resolvedPath);
    const base64Data = fileBuffer.toString('base64');
    const mimeType = this.getMimeType(fileExtension);
    const dataUrl = `data:${mimeType};base64,${base64Data}`;

    return {
      fileInfo: {
        path: resolvedPath,
        size: fileSize,
        type: fileType,
        isLocal: true,
      },
      dataUrl,
    };
  }

  private static getFileType(filePath: string): 'image' | 'video' {
    const extension = path.extname(filePath).toLowerCase().slice(1);
    if (this.SUPPORTED_IMAGE_FORMATS.includes(extension)) {
      return 'image';
    }
    if (this.SUPPORTED_VIDEO_FORMATS.includes(extension)) {
      return 'video';
    }
    throw new Error(`Unsupported file type: ${extension}`);
  }

  private static getMimeType(extension: string): string {
    const mimeTypes: Record<string, string> = {
      'png': 'image/png',
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'mp4': 'video/mp4',
      'mov': 'video/quicktime',
      'm4v': 'video/mp4',
    };
    return mimeTypes[extension] || 'application/octet-stream';
  }

  static validateImageUrl(url: string): boolean {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return false;
    }
    return true;
  }

  static validateVideoUrl(url: string): boolean {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return false;
    }
    return true;
  }
}