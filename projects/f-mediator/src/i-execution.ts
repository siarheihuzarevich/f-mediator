import { IPipelineContext } from './i-pipeline-context';

export interface IExecution<TRequest, TResponse, TContext = any> {
  handle(request: TRequest, context?: IPipelineContext<TContext>): TResponse;
}
