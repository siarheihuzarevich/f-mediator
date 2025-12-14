import { IQuery } from './i-query';
import { IHandler } from './i-handler';
import { IPipelineContext } from './i-pipeline-context';

export interface IQueryHandler<TQuery extends IQuery<TResponse>, TResponse, TContext = any>
  extends IHandler<TQuery, TResponse> {
  handle(query: TQuery, context?: IPipelineContext<TContext>): TResponse;
}
