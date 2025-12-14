import { Type } from '@angular/core';
import { FMediator } from '../core/f-mediator';
import { IExecution } from '../interfaces/i-execution';

type Constructor<T = any> = new (...args: any[]) => T;

export function FExecutionRegister<TRequest, TResponse>(requestType: Type<TRequest>) {
  return function (constructor: Constructor<IExecution<TRequest, TResponse>>) {
    FMediator.registerPipeline(requestType, constructor, false);
  };
}
