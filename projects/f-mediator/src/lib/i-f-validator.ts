import { Observable } from 'rxjs';
import { IFRequest } from './i-f-request';

/**
 * @interface IFValidator
 * @description Interface for defining request validators.
 * @template TRequest The type of the request to be validated.
 * @template TResponse The type of the response expected for this request.
 */
export interface IFValidator<TRequest extends IFRequest<TResponse>, TResponse> {

  /**
   * @method validate
   * @description Validates a request.
   * @param {TRequest} request - The request to be validated.
   * @returns {Observable<Error[]>} - An observable with an array of errors.
   */
  validate(request: TRequest): Observable<Error[]>;
}
