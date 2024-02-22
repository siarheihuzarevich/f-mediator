import { IRequest } from "./i-request";
import { IRequestValidator } from "./i-request-validator";
import { IRequestHandler } from "./i-request-handler";

export class Pipeline<TRequest extends IRequest<TResponse> = any, TResponse = any> {

  constructor(
    private readonly validator: IRequestValidator<TRequest, TResponse> | null,
    private readonly executable: IRequestHandler<TRequest, TResponse>
  ) {
  }

  public async execute(payload: TRequest): Promise<TResponse> {
    if (this.validator) {
      const errors = await this.validator.handle(payload);
      if (errors.length > 0) {
        throw errors;
      }
    }
    return this.executable.handle(payload);
  }
}
