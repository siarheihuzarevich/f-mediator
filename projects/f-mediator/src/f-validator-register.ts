import { Type } from '@angular/core';
import { FMediator } from './f-mediator';
import { IValidator } from './i-validator';

type Constructor<T = any> = new (...args: any[]) => T;

export function FValidatorRegister<TRequest, TResponse>(requestType: Type<TRequest>) {
  return function (constructor: Constructor<IValidator<TRequest>>) {
    FMediator.registerPipeline(requestType, constructor, true);
  };
}
