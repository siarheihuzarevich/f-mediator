import { Type } from '@angular/core';
import { FMediator } from '../core/f-mediator';
import { IQueryHandler } from '../interfaces/i-query-handler';
import { IQuery } from '../interfaces/i-query';

type Constructor<T = any> = new (...args: any[]) => T;

export function FQueryHandlerRegister<TQuery extends IQuery<TResponse>, TResponse>(
  queryType: Type<TQuery>
) {
  return function (constructor: Constructor<IQueryHandler<TQuery, TResponse>>) {
    FMediator.registerPipeline(queryType, constructor, false);
  };
}
