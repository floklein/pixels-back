interface IPixelsError extends Error {
  statusCode: number;
}

export class PixelsError extends Error implements IPixelsError {
  public statusCode: number;
  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = "PixelsError";
    this.statusCode = statusCode ?? 500;
  }
}

export const IsPixelsError = (error: any): error is IPixelsError =>
  error.statusCode !== undefined;
