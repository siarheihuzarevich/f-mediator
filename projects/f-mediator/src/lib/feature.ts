import { Observable, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IFRequest, IFQueryHandler, IFValidator, IFCommandHandler } from 'f-mediator';

/**
 * @class Feature
 * @description Encapsulates the logic of validating and handling a request.
 */
export class Feature<TRequest extends IFRequest<TResponse>, TResponse> {

  /**
   * @constructor
   * @description Initializes the Feature with a request type, validator, and handler.
   * @param {string} requestType - The name of the request type.
   * @param {IFValidator<TRequest, TResponse>} validator - The validator for the request.
   * @param {IFQueryHandler<TRequest, TResponse> | IFCommandHandler<TRequest, TResponse>} requestHandler - The handler for the request.
   */
  constructor(
    public requestType: string,
    private validator: IFValidator<TRequest, TResponse>,
    private requestHandler: IFQueryHandler<TRequest, TResponse> | IFCommandHandler<TRequest, TResponse>
  ) {
  }

  /**
   * @method execute
   * @description Validates and handles a request.
   * @param {TRequest} request - The request to be validated and handled.
   * @returns {Observable<TResponse>} - The observable response from the request handler.
   */
  public execute(request: TRequest): Observable<TResponse> {
    return this.validator.validate(request).pipe(
      switchMap((errors: Error[]) => {
        if (errors && errors.length > 0) {
          return throwError(() => errors);
        }
        return this.requestHandler.handle(request);
      }),
    );
  }
}
