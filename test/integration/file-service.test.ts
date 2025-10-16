import { describe, it, expect } from 'bun:test';
import { FileService } from '../../src/services/FileService';
import fs from 'fs';
import path from 'path';

describe('FileService', () => {
  const testImageDir = path.join(__dirname, '../fixtures');

  describe('processFile', () => {
    it('should process a local PNG file', async () => {
      const imagePath = path.join(testImageDir, 'example.png');

      // Ensure test file exists
      if (!fs.existsSync(imagePath)) {
        // Create a dummy test file
        const dummyBuffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==', 'base64');
        fs.writeFileSync(imagePath, dummyBuffer);
      }

      const result = await FileService.processFile(imagePath);

      expect(result.fileInfo.isLocal).toBe(true);
      expect(result.fileInfo.type).toBe('image');
      expect(result.dataUrl).toBeDefined();
      expect(result.dataUrl).toMatch(/^data:image\/png;base64,/);
    });

    it('should handle remote URLs', async () => {
      const url = 'https://example.com/image.jpg';
      const result = await FileService.processFile(url);

      expect(result.fileInfo.isLocal).toBe(false);
      expect(result.fileInfo.path).toBe(url);
      expect(result.dataUrl).toBeUndefined();
    });

    it('should throw error for non-existent files', async () => {
      expect(() => FileService.processFile('/non/existent/file.png')).toThrow('File not found');
    });

    it('should throw error for unsupported formats', async () => {
      const invalidPath = path.join(testImageDir, 'test.txt');
      fs.writeFileSync(invalidPath, 'test content');

      expect(() => FileService.processFile(invalidPath)).toThrow('Unsupported file type');

      // Clean up
      fs.unlinkSync(invalidPath);
    });
  });

  describe('validateImageUrl', () => {
    it('should validate HTTPS URLs', () => {
      expect(FileService.validateImageUrl('https://example.com/image.jpg')).toBe(true);
    });

    it('should validate HTTP URLs', () => {
      expect(FileService.validateImageUrl('http://example.com/image.jpg')).toBe(true);
    });

    it('should reject invalid URLs', () => {
      expect(FileService.validateImageUrl('ftp://example.com/image.jpg')).toBe(false);
      expect(FileService.validateImageUrl('not-a-url')).toBe(false);
    });
  });

  describe('validateVideoUrl', () => {
    it('should validate HTTPS URLs', () => {
      expect(FileService.validateVideoUrl('https://example.com/video.mp4')).toBe(true);
    });

    it('should validate HTTP URLs', () => {
      expect(FileService.validateVideoUrl('http://example.com/video.mp4')).toBe(true);
    });

    it('should reject invalid URLs', () => {
      expect(FileService.validateVideoUrl('ftp://example.com/video.mp4')).toBe(false);
      expect(FileService.validateVideoUrl('not-a-url')).toBe(false);
    });
  });
});