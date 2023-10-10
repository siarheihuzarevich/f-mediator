import { Observable, of } from 'rxjs';
import { IFValidator } from './i-f-validator';
import { IFRequest } from './i-f-request';
import { Injectable } from '@angular/core';

/**
 * @class FEmptyValidator
 * @description A placeholder validator that always returns a successful validation.
 */
@Injectable({
  providedIn: 'root',
})
export class FEmptyValidator<TRequest extends IFRequest<TResponse>, TResponse> implements IFValidator<TRequest, TResponse> {

  /**
   * @method validate
   * @description Validates a request, always returning a successful validation.
   * @param {TRequest} request - The request to be validated.
   * @returns {Observable<Error[]>} - An observable with an empty array of errors.
   */
  public validate(request: TRequest): Observable<Error[]> {
    return of([]);
  }
}
