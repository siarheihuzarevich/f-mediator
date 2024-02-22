import { IRequest } from "./i-request";

export interface IRequestHandler<TRequest extends IRequest<TResponse>, TResponse> {

  handle(request: TRequest): Promise<TResponse>;
}
