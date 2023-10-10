import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { F_FEATURE_TOKEN, FMediator } from './f-mediator';
import { IFRequest } from './i-f-request';
import { IFValidator } from './i-f-validator';
import { IFQueryHandler } from './i-f-query-handler';
import { Feature } from './feature';

/**
 * @module FMediatorModule
 * @description The main module of the f-mediator library.
 */
@NgModule()
export class FMediatorModule {

  /**
   * @method forRoot
   * @description Registers the FMediator service as a singleton.
   * @returns {ModuleWithProviders<FMediatorModule>} - The module with providers configuration.
   */
  public static forRoot(): ModuleWithProviders<FMediatorModule> {
    return {
      ngModule: FMediatorModule,
      providers: [ FMediator ]
    };
  }

  /**
   * @method forFeature
   * @description Registers a feature with a request, validator, and handler.
   * @param {Type<TRequest>} requestType - The request type for the feature.
   * @param {Type<IFValidator<TRequest, TResponse>>} validatorType - The validator type for the feature.
   * @param {Type<IFQueryHandler<TRequest, TResponse>>} handlerType - The handler type for the feature.
   * @returns {ModuleWithProviders<FMediatorModule>} - The module with providers configuration.
   */
  public static forFeature<TRequest extends IFRequest<TResponse>, TResponse>(
    requestType: Type<TRequest>,
    validatorType: Type<IFValidator<TRequest, TResponse>>,
    handlerType: Type<IFQueryHandler<TRequest, TResponse>>
  ): ModuleWithProviders<FMediatorModule> {
    return {
      ngModule: FMediatorModule,
      providers: [
        validatorType,
        handlerType,
        {
          provide: F_FEATURE_TOKEN,
          useFactory: (validator: IFValidator<TRequest, TResponse>, handler: IFQueryHandler<TRequest, TResponse>) => {
            return new Feature(requestType.name, validator, handler);
          },
          deps: [ validatorType, handlerType ],
          multi: true
        }
      ]
    };
  }
}
