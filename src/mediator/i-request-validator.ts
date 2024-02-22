import { IRequest } from "./i-request";

export interface IRequestValidator<TRequest extends IRequest<TResponse>, TResponse> {

  handle(request: TRequest): Promise<void>;
}
