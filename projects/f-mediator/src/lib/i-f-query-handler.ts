import { Observable } from 'rxjs';
import { IFRequest } from './i-f-request';

/**
 * @interface IFQueryHandler
 * @description Interface for defining query handlers.
 * @template TRequest The type of the request to be queried.
 * @template TResponse The type of the response expected for this request.
 */
export interface IFQueryHandler<TRequest extends IFRequest<TResponse>, TResponse> {

  /**
   * @method handle
   * @description Handles a query request.
   * @param {TRequest} request - The request to be queried.
   * @returns {Observable<TResponse>} - The observable response from the handler.
   */
  handle(request: TRequest): Observable<TResponse>;
}
