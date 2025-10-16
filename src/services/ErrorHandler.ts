export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class ErrorHandler {
  static handle(error: unknown): { content: Array<{ type: string; text: string }> } {
    if (error instanceof AppError) {
      return {
        content: [{ type: "text", text: `Error: ${error.message} (Code: ${error.code})` }],
      };
    }

    if (error instanceof Error) {
      return {
        content: [{ type: "text", text: `Error: ${error.message}` }],
      };
    }

    return {
      content: [{ type: "text", text: `Unknown error occurred: ${String(error)}` }],
    };
  }

  static wrapAsync<T>(fn: (...args: any[]) => Promise<{ content: Array<{ type: string; text: string }> }>) {
    return async (...args: any[]): Promise<{ content: Array<{ type: string; text: string }> }> => {
      try {
        return await fn(...args);
      } catch (error) {
        return ErrorHandler.handle(error).content as Array<{ type: string; text: string }>;
      }
    };
  }
}

export const createError = {
  fileNotFound: (path: string) => new AppError(`File not found: ${path}`, 'FILE_NOT_FOUND', 404),
  fileTooLarge: (maxSize: string) => new AppError(`File too large. Maximum size is ${maxSize}`, 'FILE_TOO_LARGE', 413),
  unsupportedFormat: (format: string) => new AppError(`Unsupported file format: ${format}`, 'UNSUPPORTED_FORMAT', 422),
  apiError: (message: string) => new AppError(`API error: ${message}`, 'API_ERROR', 500),
  networkError: (message: string) => new AppError(`Network error: ${message}`, 'NETWORK_ERROR', 503),
  invalidUrl: (url: string) => new AppError(`Invalid URL: ${url}`, 'INVALID_URL', 400),
  maxRetriesExceeded: () => new AppError('Max retries exceeded', 'MAX_RETRIES_EXCEEDED', 503),
};