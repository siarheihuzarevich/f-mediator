import { Injectable, Inject, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { IFRequest } from './i-f-request';
import { Feature } from './feature';

export const F_FEATURE_TOKEN = new InjectionToken('F_FEATURE_TOKEN');

/**
 * @class FMediator
 * @description The main service of the f-mediator library.
 */
@Injectable({
  providedIn: 'root',
})
export class FMediator {

  private features = new Map<string, Feature<any, any>>();

  /**
   * @constructor
   * @description Initializes the FMediator service with the registered features.
   * @param {Feature<any, any>[]} featureProviders - The array of registered features.
   */
  constructor(@Inject(F_FEATURE_TOKEN) private featureProviders: Feature<any, any>[]) {
    for (const feature of featureProviders) {
      this.features.set(feature.requestType, feature);
    }
  }

  /**
   * @method send
   * @description Sends a request to the appropriate feature for handling.
   * @param {TRequest} request - The request to be handled.
   * @returns {Observable<TResponse>} - The observable response from the feature handler.
   */
  public send<TRequest extends IFRequest<TResponse>, TResponse>(request: TRequest): Observable<TResponse> {
    const feature = this.features.get(request.constructor.name);
    if (!feature) {
      throw new Error('Feature not registered for request type.');
    }
    return feature.execute(request);
  }
}
