import { ApiProperty } from '@nestjs/swagger';

export class ApiResponse<T = any> {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  statusCode: number;

  @ApiProperty({ required: false })
  message?: string;

  @ApiProperty({ required: false })
  timestamp?: string;

  @ApiProperty({ required: false })
  path?: string;

  @ApiProperty({ required: false })
  data?: T;

  private constructor(partial: Partial<ApiResponse<T>>) {
    Object.assign(this, partial);
  }

  static success<T>(data: T, message?: string): ApiResponse<T> {
    return new ApiResponse({
      success: true,
      statusCode: 200,
      message,
      data,
    });
  }

  static created<T>(data: T, message?: string): ApiResponse<T> {
    return new ApiResponse({
      success: true,
      statusCode: 201,
      message: message || 'Resource created',
      data,
    });
  }

  static deleted(message = 'Resource deleted'): ApiResponse<null> {
    return new ApiResponse({
      success: true,
      statusCode: 200,
      message,
      data: null,
    });
  }

  static error(message: string, statusCode = 500, path?: string): ApiResponse<null> {
    return new ApiResponse({
      success: false,
      statusCode,
      message,
      timestamp: new Date().toISOString(),
      path,
    });
  }
}
