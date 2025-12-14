import { IQuery } from './i-query';
import { IHandler } from './i-handler';

export interface IQueryHandler<TQuery extends IQuery<TResponse>, TResponse>
  extends IHandler<TQuery, TResponse> {
}
