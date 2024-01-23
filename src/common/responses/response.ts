export class ResponseDto {
  constructor(
    public status: string,
    public message: string,
    public data: any,
  ) {}
}

export class SuccessResponse extends ResponseDto {
  constructor(data: any, message = 'Success') {
    super('success', message, data);
  }
}

export class ErrorResponse extends ResponseDto {
  constructor(data: any, message = 'Error') {
    super('error', message, data);
  }
}
