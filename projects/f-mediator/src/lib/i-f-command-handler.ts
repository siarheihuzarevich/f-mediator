import { Observable } from 'rxjs';
import { IFRequest } from './i-f-request';

/**
 * @interface IFCommandHandler
 * @description Interface for defining command handlers.
 * @template TRequest The type of the request to be handled.
 * @template TResponse The type of the response expected for this request.
 */
export interface IFCommandHandler<TRequest extends IFRequest<TResponse>, TResponse> {

  /**
   * @method handle
   * @description Handles a request.
   * @param {TRequest} request - The request to be handled.
   * @returns {Observable<TResponse>} - The observable response from the handler.
   */
  handle(request: TRequest): Observable<TResponse>;
}
