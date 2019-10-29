export class ApiException extends Error {
  constructor(public errorCode: number, message: string) {
    super(message);
  }
}
